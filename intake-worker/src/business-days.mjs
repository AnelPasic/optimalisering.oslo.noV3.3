const osloClock = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Oslo', year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', hourCycle: 'h23',
});
const dayMs = 86400000;
const monthDay = date => date.toISOString().slice(5, 10);
const fixedHolidays = new Set(['01-01', '05-01', '05-17', '12-25', '12-26']);

function easterSunday(year) {
  // Gregorian computus, evaluated on UTC calendar dates to avoid DST arithmetic.
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const l = (32 + 2 * e + 2 * Math.floor(c / 4) - h - c % 4) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const n = h + l - 7 * m + 114;
  return Date.UTC(year, Math.floor(n / 31) - 1, n % 31 + 1);
}

function businessDay(date) {
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6 || fixedHolidays.has(monthDay(date))) return false;
  const fromEaster = (date.getTime() - easterSunday(date.getUTCFullYear())) / dayMs;
  return ![-3, -2, 1, 39, 50].includes(fromEaster);
}

export function assessmentDueDate(createdAtMs) {
  const parts = Object.fromEntries(osloClock.formatToParts(createdAtMs).map(({ type, value }) => [type, value]));
  let date = new Date(Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day)));
  const nextDay = () => date = new Date(date.getTime() + dayMs);

  // An inquiry received at or after 16:00 Oslo time enters the next business day's queue.
  if (Number(parts.hour) >= 16) nextDay();
  while (!businessDay(date)) nextDay();
  for (let elapsed = 0; elapsed < 2;) {
    nextDay();
    if (businessDay(date)) elapsed++;
  }
  return date.toISOString().slice(0, 10);
}
