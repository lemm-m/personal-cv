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
// Local SVG icons keep the toolkit independent of fonts, CDNs, and network access.
const skillIcons={
  'html5':'html5','html':'html5','css3':'css3','css':'css3',
  'javascript':'javascript','bootstrap':'bootstrap','python':'python','java':'java',
  'git & github':'git','git':'git','visual studio code':'vscode','vscode':'vscode',
  'figma':'figma','responsive design':'responsive','ui/ux design':'design',
  'problem solving':'problem'
};
cv.skillGroups.forEach(group=>{
  const box=el('article','skill-group');
  const list=el('ul','toolkit-list');
  group.items.forEach(name=>{
    const item=el('li','toolkit-item');
    const iconBox=el('span','toolkit-icon');
    iconBox.setAttribute('aria-hidden','true');
    const icon=skillIcons[name.trim().toLowerCase()];
    if(icon){
      const img=el('img');img.src='assets/icons/'+icon+'.svg';img.alt='';
      img.width=26;img.height=26;iconBox.append(img);
    }else{iconBox.append(el('span','toolkit-fallback',name.startsWith('[')?'+':name.slice(0,2).toUpperCase()));}
    item.append(iconBox,el('span','toolkit-label',name));list.append(item);
  });
  box.append(el('h3','',group.title),list);$('skill-list').append(box);
});
cv.projects.forEach((p,i)=>{const article=el('article','project');const preview=el('div','project-preview');image(preview,p.image,'Add project screenshot',String(i+1).padStart(2,'0'));const body=el('div','project-body');body.append(el('p','eyebrow',p.type),el('h3','',p.name),el('p','detail',p.description),tags(p.technologies));const links=el('div','project-links');links.append(link(p.repository,'Source code'),link(p.demo,'Live demo'));body.append(links);article.append(preview,body);$('project-list').append(article);});
$('github-link').append(link(cv.links.github,'GitHub'));
$('linkedin-link').append(link(cv.links.linkedin,'LinkedIn'));
['facebook','instagram'].forEach(key=>{const box=el('div','social-item');box.append(el('h3','',key[0].toUpperCase()+key.slice(1)),link(cv.links[key],'Profile'));$('social-list').append(box);});
cv.achievements.forEach(item=>{const box=el('article','achievement');const preview=el('div','certificate-preview');image(preview,item.image,'Add certificate or achievement image','▤');box.append(preview,el('h3','',item.title),el('p','subtitle',item.organization),el('span','date',item.date),el('p','detail',item.description),link(item.url,'View credential'));$('achievement-list').append(box);});
cv.experience.forEach(item=>{const article=el('article');const row=el('div','item-heading');row.append(el('h3','',item.role),el('span','date',item.date));article.append(row,el('p','subtitle',item.organization),el('p','detail',item.description));if(item.bullets.length){const list=el('ul');item.bullets.forEach(b=>list.append(el('li','',b)));article.append(list);}$('experience-list').append(article);});
$('year').textContent=new Date().getFullYear();
['community','training'].forEach(category=>{
  (cv[category]||[]).forEach(item=>{
    const article=el('article');
    const row=el('div','item-heading');
    row.append(el('h3','',item.title),el('span','date',item.date));
    article.append(row,el('p','subtitle',item.organization),el('p','detail',item.description));
    $(category+'-list').append(article);
  });
});
$('contact-email').append(link('mailto:'+cv.email,cv.email));
// A useful contact interaction with visible, screen-reader-friendly feedback.
const emailDetails = [...document.querySelectorAll('#info dd')][1];
const copyEmail = el('button','copy-email','Copy email');
const copyStatus = el('span','copy-status');
copyStatus.setAttribute('role','status');
emailDetails.append(copyEmail,copyStatus);
let copyTimer;
copyEmail.addEventListener('click',async()=>{
  try {
    await navigator.clipboard.writeText(cv.email);
    copyStatus.textContent='Copied!';
  } catch {
    copyStatus.textContent='Select the email address to copy it.';
  }
  clearTimeout(copyTimer);
  copyTimer=setTimeout(()=>{copyStatus.textContent='';},3500);
});
const topLink=el('a','back-top','↑');
topLink.href='#profile';
topLink.setAttribute('aria-label','Back to top');
topLink.hidden=true;
document.body.append(topLink);
const progress=el('div','reading-progress');
progress.setAttribute('aria-hidden','true');
document.querySelector('.topbar').append(progress);
let scrollPending=false;
function updateScroll(){
  const height=document.documentElement.scrollHeight-innerHeight;
  progress.style.transform='scaleX('+(height>0?Math.min(1,Math.max(0,scrollY/height)):0)+')';
  topLink.hidden=scrollY<600;
  scrollPending=false;
}
addEventListener('scroll',()=>{if(!scrollPending){scrollPending=true;requestAnimationFrame(updateScroll);}},{passive:true});
addEventListener('resize',updateScroll);
updateScroll();
function themeLabel(){const dark=document.documentElement.dataset.theme==='dark';$('theme-label').textContent=dark?'Light':'Dark';$('theme').setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');}
themeLabel();$('theme').addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;try{localStorage.setItem('cv-theme',next);}catch{}themeLabel();});
$('print').addEventListener('click',()=>window.print());
function closeMenu(){document.querySelector('aside').classList.remove('open');$('menu').setAttribute('aria-expanded','false');$('menu').textContent='Menu +';}
$('menu').addEventListener('click',()=>{const open=document.querySelector('aside').classList.toggle('open');$('menu').setAttribute('aria-expanded',String(open));$('menu').textContent=open?'Close −':'Menu +';});
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();$('menu').focus();}});
matchMedia('(min-width: 761px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
const navLinks=[...document.querySelectorAll('nav a')];
function highlightSection(id){
  navLinks.forEach(a=>{
    const current=a.hash==='#'+id;
    a.classList.toggle('active',current);
    if(current)a.setAttribute('aria-current','location');
    else a.removeAttribute('aria-current');
  });
}
highlightSection(location.hash.slice(1)||'profile');
navLinks.forEach(a=>a.addEventListener('click',()=>highlightSection(a.hash.slice(1))));
if('IntersectionObserver' in window){
  const active=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)highlightSection(entry.target.id);});},{rootMargin:'-10% 0px -65% 0px'});
  document.querySelectorAll('main section').forEach(s=>active.observe(s));
  const reveal=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('reveal');reveal.unobserve(e.target);}});},{threshold:.08});
  document.querySelectorAll('.project,.skill-group,.achievement,.timeline article').forEach(s=>reveal.observe(s));
}
