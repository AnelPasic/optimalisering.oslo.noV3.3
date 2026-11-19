# Medon dashboard module

Source revision `2ac4e729d9449ffe8b3542bfddce48556478194f` in `AnelPasic/MedonWebSystem`.

Module SHA-256 `3AC7B3B89495DB62BE7EC77A5B78B0CAB4AC0F375F79C0883DFC2865F831CD8E`.

`medon-dashboard.mjs` is generated from the shared `AnelPasic/MedonWebSystem` lead-intake kit. Its source entrypoint is `kits/lead-intake/src/legacy-dashboard.mjs` and its build command is `node scripts/build-legacy-dashboard.mjs <destination.mjs>` after `npm run build:css`.

The Oslo dashboard uses the existing D1 receipt table, Access audience and operator grants. It reads data without a migration. The original lead transport, notifications, retry and legacy JSON/CSV endpoints retain their existing handlers.

The site registry in `src/dashboard.mjs` includes Optimalisering Oslo, OpenAIAds and ChatGPTAds. Only Oslo currently supplies receipts. Traffic is shown as unmeasured. The earliest retained Oslo receipt was verified through an aggregate database query before publication.
