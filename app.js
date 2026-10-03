document.documentElement.classList.add('js');
const paths={
  check:'<path d="m20 6-11 11-5-5"/>',
  pin:'<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  route:'<circle cx="5" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 6h8a4 4 0 0 1 0 8h-5a4 4 0 0 0 0 8h7"/>',
  bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
  shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
  lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/><circle cx="12" cy="15.5" r=".7"/>',
  phone:'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1Z"/>',
  play:'<path d="m7 4 13 8-13 8V4Z"/>',
  car:'<path d="m5 11 1.5-5h11L19 11"/><path d="M5 11h14a2 2 0 0 1 2 2v5H3v-5a2 2 0 0 1 2-2Z"/><path d="M5 18v2h2v-2m10 0v2h2v-2"/><path d="M7 14h2m6 0h2"/>',
  diamond:'<path d="M6 3h12l4 6-10 12L2 9l4-6Z"/><path d="M2 9h20M6 3l6 18 6-18"/>',
  users:'<circle cx="9" cy="8" r="3"/><path d="M3 21v-2a6 6 0 0 1 12 0v2H3Zm13-16a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 4v2h-3"/>',
  expand:'<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>',
  message:'<path d="M21 11.5a9 9 0 0 1-13 8L3 21l1.5-5a9 9 0 1 1 16.5-4.5Z"/><path d="M8.2 7.8c.6 4.5 3.5 7.4 8 8l1.1-2.2-2.4-1.2-1.2 1.1a9 9 0 0 1-3.2-3.2l1.1-1.2-1.2-2.4-2.2 1.1Z"/>'
};
document.querySelectorAll('[data-icon]').forEach(el=>{el.innerHTML='<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">'+(paths[el.dataset.icon]||paths.pin)+'</svg>';el.replaceWith(el.firstElementChild)});
document.querySelectorAll('[data-wa]').forEach(a=>{a.href='https://wa.me/5511999990000?text='+encodeURIComponent(a.dataset.wa.startsWith('Olá')?a.dataset.wa:'Olá! '+a.dataset.wa);a.target='_blank';a.rel='noopener noreferrer'});
document.querySelector('#year').textContent=new Date().getFullYear();
document.querySelectorAll('.stagger').forEach(group=>[...group.children].forEach((el,i)=>el.style.setProperty('--delay',Math.min(i*.09,.3)+'s')));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const header=document.querySelector('header'),menu=document.querySelector('.menu'),nav=document.querySelector('#navigation');
function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menu');nav.classList.remove('open')}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');nav.classList.toggle('open',open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
const nextSection=document.querySelector('#solucoes');
function updateHeader(){header.classList.toggle('scrolled',scrollY>=nextSection.offsetTop-120)}
addEventListener('scroll',updateHeader,{passive:true});addEventListener('resize',updateHeader);updateHeader();
const hero=document.querySelector('.hero'),reduce=matchMedia('(prefers-reduced-motion: reduce)');let pointerFrame=0;
hero.addEventListener('pointermove',event=>{if(reduce.matches||event.pointerType==='touch')return;if(pointerFrame)cancelAnimationFrame(pointerFrame);pointerFrame=requestAnimationFrame(()=>{const r=hero.getBoundingClientRect();hero.style.setProperty('--mx',(event.clientX-r.left)+'px');hero.style.setProperty('--my',(event.clientY-r.top)+'px')})},{passive:true});
hero.addEventListener('pointerleave',()=>{hero.style.removeProperty('--mx');hero.style.removeProperty('--my')});
const dialog=document.querySelector('#image-dialog'),preview=document.querySelector('.tablet-preview');
preview.addEventListener('click',()=>dialog.showModal());
document.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
dialog.addEventListener('close',()=>preview.focus());

const reviewsSection=document.querySelector('.reviews-section');
if(reviewsSection){
  const cards=[...reviewsSection.querySelectorAll('.review-card')];
  const track=reviewsSection.querySelector('.reviews-track');
  cards.forEach(card=>{const clone=card.cloneNode(true);clone.setAttribute('aria-hidden','true');track.appendChild(clone)});
}
