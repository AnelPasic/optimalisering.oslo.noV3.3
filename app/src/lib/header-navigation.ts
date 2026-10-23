/** Ordinary website navigation disclosure, not an application ARIA menu. */
export function mountHeaderNavigation(header:HTMLElement){
 const toggle=header.querySelector<HTMLButtonElement>('[data-home-menu]')!;
 const mobile=header.querySelector<HTMLElement>('#mobile-menu')!;
 const controls=[...header.querySelectorAll<HTMLButtonElement>('[data-nav-disclosure]')];
 const panel=(button:HTMLButtonElement)=>document.getElementById(button.getAttribute('aria-controls')!)!;
 function setOpen(button:HTMLButtonElement,open:boolean){button.setAttribute('aria-expanded',String(open));panel(button).hidden=!open;}
 function closeChildren(){controls.forEach(button=>setOpen(button,false));}
 function closeMobile(){closeChildren();toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label',toggle.dataset.openLabel!);mobile.hidden=true;}
 function openChild(button:HTMLButtonElement){closeChildren();setOpen(button,true);}
 controls.forEach(button=>{
  button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';closeChildren();if(open)setOpen(button,true);});
  button.addEventListener('keydown',event=>{
   if(event.key!=='ArrowDown'&&event.key!=='ArrowUp')return;
   event.preventDefault();openChild(button);
   const links=[...panel(button).querySelectorAll<HTMLAnchorElement>('a')];
   (event.key==='ArrowDown'?links[0]:links.at(-1))?.focus();
  });
  const item=button.closest('li')!;
  item.addEventListener('focusout',event=>{if(!item.contains(event.relatedTarget as Node|null))setOpen(button,false);});
 });
 toggle.addEventListener('click',()=>{
  const open=toggle.getAttribute('aria-expanded')!=='true';closeMobile();
  if(open){toggle.setAttribute('aria-expanded','true');toggle.setAttribute('aria-label',toggle.dataset.closeLabel!);mobile.hidden=false;}
 });
 header.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMobile));
 document.addEventListener('click',event=>{if(!header.contains(event.target as Node))closeMobile();});
 document.addEventListener('keydown',event=>{
  if(event.key!=='Escape')return;
  const child=controls.find(button=>button.getAttribute('aria-expanded')==='true');
  if(child){event.preventDefault();setOpen(child,false);child.focus();return;}
  if(toggle.getAttribute('aria-expanded')==='true'){event.preventDefault();closeMobile();toggle.focus();}
 });
 matchMedia('(min-width: 901px)').addEventListener('change',event=>{
  const active=document.activeElement;
  const hiddenFocus=event.matches?mobile.contains(active):!!header.querySelector('.desktop-nav')?.contains(active);
  closeMobile();
  if(hiddenFocus)(event.matches?header.querySelector<HTMLAnchorElement>('.desktop-nav a'):toggle)?.focus();
 });
}
