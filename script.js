/* Content is rendered with textContent, so editing your CV never requires HTML. */
const cv=window.cv;
const $=id=>document.getElementById(id);
function el(tag,cls,text){const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;}
function link(url,label){
  if(!url)return el('span','placeholder-link',label+' · Link to be added');
  let safe;try{safe=new URL(url);if(!['https:','mailto:','tel:'].includes(safe.protocol))throw Error();}catch{return el('span','placeholder-link',label+' · Check URL');}
  const a=el('a','text-link',label+' ↗');a.href=url;if(safe.protocol==='https:'){a.target='_blank';a.rel='noopener noreferrer';}return a;
}
function image(container,src,alt,symbol){if(src){const img=el('img');img.src=src;img.alt=alt;img.loading='lazy';container.append(img);}else{const box=el('div','image-placeholder');box.append(el('span',symbol==='LB'?'monogram':'preview-symbol',symbol),el('span','',alt));container.append(box);}}
function tags(items){const box=el('div','tags');items.forEach(t=>box.append(el('span','tag',t)));return box;}
['name','title','introduction','objective'].forEach(id=>$(id).textContent=cv[id]);
image($('portrait'),cv.portrait,'Add your profile photo','LB');
const info=[['Location',cv.location],['Email',cv.email],['Contact number',cv.phone||'[Add number, optional]'],['Current year',cv.yearLevel],['Personal description','IT student, hands-on learner, and aspiring web developer.'],['Career interests','Web development · UI/UX design · Software development']];
info.forEach(([label,value])=>{const box=el('div');box.append(el('dt','',label));const dd=el('dd');dd.append(label==='Email'?link('mailto:'+value,value):label==='Contact number'&&cv.phone?link('tel:'+cv.phone,cv.phone):document.createTextNode(value));box.append(dd);$('info').append(box);});
cv.education.forEach(item=>{const a=el('article');const row=el('div','item-heading');row.append(el('h3','',item.school),el('span','date',item.date));a.append(row,el('p','subtitle',item.program),el('p','detail',item.detail));$('education-list').append(a);});
cv.skillGroups.forEach(group=>{const box=el('article','skill-group');box.append(el('h3','',group.title),tags(group.items));$('skill-list').append(box);});
cv.projects.forEach((p,i)=>{const article=el('article','project');const preview=el('div','project-preview');image(preview,p.image,'Add project screenshot',String(i+1).padStart(2,'0'));const body=el('div','project-body');body.append(el('p','eyebrow',p.type),el('h3','',p.name),el('p','detail',p.description),tags(p.technologies));const links=el('div','project-links');links.append(link(p.repository,'Source code'),link(p.demo,'Live demo'));body.append(links);article.append(preview,body);$('project-list').append(article);});
$('github-link').append(link(cv.links.github,'GitHub'));
$('linkedin-link').append(link(cv.links.linkedin,'LinkedIn'));
['facebook','instagram'].forEach(key=>{const box=el('div','social-item');box.append(el('h3','',key[0].toUpperCase()+key.slice(1)),link(cv.links[key],'Profile'));$('social-list').append(box);});
cv.achievements.forEach(item=>{const box=el('article','achievement');const preview=el('div','certificate-preview');image(preview,item.image,'Add certificate or achievement image','▤');box.append(preview,el('h3','',item.title),el('p','subtitle',item.organization),el('span','date',item.date),el('p','detail',item.description),link(item.url,'View credential'));$('achievement-list').append(box);});
cv.experience.forEach(item=>{const article=el('article');const row=el('div','item-heading');row.append(el('h3','',item.role),el('span','date',item.date));article.append(row,el('p','subtitle',item.organization),el('p','detail',item.description));if(item.bullets.length){const list=el('ul');item.bullets.forEach(b=>list.append(el('li','',b)));article.append(list);}$('experience-list').append(article);});
$('year').textContent=new Date().getFullYear();
function themeLabel(){const dark=document.documentElement.dataset.theme==='dark';$('theme-label').textContent=dark?'Light':'Dark';$('theme').setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');}
themeLabel();$('theme').addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;try{localStorage.setItem('cv-theme',next);}catch{}themeLabel();});
$('print').addEventListener('click',()=>window.print());
function closeMenu(){document.querySelector('aside').classList.remove('open');$('menu').setAttribute('aria-expanded','false');$('menu').textContent='Menu +';}
$('menu').addEventListener('click',()=>{const open=document.querySelector('aside').classList.toggle('open');$('menu').setAttribute('aria-expanded',String(open));$('menu').textContent=open?'Close −':'Menu +';});
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();$('menu').focus();}});
matchMedia('(min-width: 761px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
const navLinks=[...document.querySelectorAll('nav a')];
if('IntersectionObserver' in window){
  const active=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(a=>{const current=a.hash==='#'+entry.target.id;a.classList.toggle('active',current);if(current)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}});},{rootMargin:'-10% 0px -65% 0px'});
  document.querySelectorAll('main section').forEach(s=>active.observe(s));
  const reveal=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('reveal');reveal.unobserve(e.target);}});},{threshold:.08});
  document.querySelectorAll('.project,.skill-group,.achievement,.timeline article').forEach(s=>reveal.observe(s));
}
