(() => {
const { el, link, image, skillIcons } = window.cvUI;
/* Content is rendered with textContent, so editing your CV never requires HTML. */
const cv=window.cv;
const $=id=>document.getElementById(id);
['name','title','introduction','objective'].forEach(id=>$(id).textContent=cv[id]);
image($('portrait'),cv.portrait,'Add your profile photo','LB');
const info=[['Location',cv.location],['Email',cv.email],['Contact number',cv.phone||'[Add number, optional]'],['Current year',cv.yearLevel],['Personal description',cv.personalDescription],['Career interests',cv.careerInterests]];
info.forEach(([label,value])=>{const box=el('div');box.append(el('dt','',label));const dd=el('dd');dd.append(label==='Email'?link('mailto:'+value,value):label==='Contact number'&&cv.phone?link('tel:'+cv.phone,cv.phone):document.createTextNode(value));box.append(dd);$('info').append(box);});
cv.education.forEach(item=>{const a=el('article');const row=el('div','item-heading');row.append(el('h3','',item.school));if(item.date)row.append(el('span','date',item.date));a.append(row,el('p','subtitle',item.program),el('p','detail',item.detail));$('education-list').append(a);});
// Local SVG icons keep the toolkit independent of fonts, CDNs, and network access.
cv.skillGroups.forEach(group=>{
  const box=el('article','skill-group');
  const list=el('ul','toolkit-list');
  group.items.forEach(name=>{
    const item=el('li','toolkit-item');
    const iconBox=el('span','toolkit-icon');
    iconBox.setAttribute('aria-hidden','true');
    const icon=skillIcons[name.split('·')[0].trim().toLowerCase()];
    if(icon){
      const img=el('img');img.src='assets/icons/'+icon+'.svg';img.alt='';
      img.width=26;img.height=26;iconBox.append(img);
    }else{iconBox.append(el('span','toolkit-fallback',name.startsWith('[')?'+':name.slice(0,2).toUpperCase()));}
    item.append(iconBox,el('span','toolkit-label',name));list.append(item);
  });
  box.append(el('h3','',group.title),list);$('skill-list').append(box);
});
$('github-link').append(link(cv.links.github,'GitHub'));
$('linkedin-link').append(link(cv.links.linkedin,'LinkedIn'));
['facebook','instagram'].forEach(key=>{const box=el('div','social-item');box.append(el('h3','',key[0].toUpperCase()+key.slice(1)),link(cv.links[key],'Profile'));$('social-list').append(box);});
cv.achievements.forEach(item=>{
  const box=el('article','achievement');const preview=el('div','certificate-preview');
  image(preview,item.image,item.title+' certificate','▤');
  let credential=link(item.url,'View credential');
  if(!item.url&&item.image){credential=el('a','text-link','View certificate ↗');credential.href=item.image;credential.target='_blank';credential.rel='noopener noreferrer';}
  box.append(preview,el('h3','',item.title),el('p','subtitle',item.organization),el('span','date',item.date),el('p','detail',item.description),credential);
  $('achievement-list').append(box);
});
cv.experience.forEach(item=>{
  const article=el('article');const row=el('div','item-heading');row.append(el('h3','',item.role));
  if(item.date)row.append(el('span','date',item.date));
  article.append(row);
  if(item.organization)article.append(el('p','subtitle',item.organization));
  article.append(el('p','detail',item.description));
  if(item.bullets.length){const list=el('ul');item.bullets.forEach(b=>list.append(el('li','',b)));article.append(list);}
  if(item.gallery?.length){
    const gallery=el('div','experience-gallery');
    gallery.setAttribute('aria-label',item.role+' photo gallery');
    item.gallery.forEach(photo=>{
      const figure=el('figure','experience-photo');
      const a=el('a','experience-photo-link');a.href=photo.src;a.target='_blank';a.rel='noopener noreferrer';
      a.setAttribute('aria-label',photo.title+' — open full-size photo');
      const img=el('img');img.src=photo.src;img.alt=photo.title;img.loading='lazy';a.append(img);
      const caption=el('figcaption');caption.append(el('h4','',photo.title),el('p','',photo.caption));
      figure.append(a,caption);gallery.append(figure);
    });
    article.append(gallery);
  }
  $('experience-list').append(article);
});
$('year').textContent=new Date().getFullYear();
if ($('contact-email')) $('contact-email').append(link('mailto:'+cv.email,cv.email));
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
  document.querySelectorAll('.skill-group,.achievement,.timeline article').forEach(s=>reveal.observe(s));
}


})();
