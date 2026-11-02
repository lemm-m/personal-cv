(() => {
const { el, link, image, skillIcons } = window.cvUI;
const cv=window.cv;
const $=id=>document.getElementById(id);
if(!$('project-list'))return;
// Filterable project gallery. Set category to 'group' or 'individual' in content.js.
const projectList=$('project-list');
projectList.className='project-gallery';
const full=projectList.dataset.mode==='all';
const filters=el('div','project-filters');
filters.setAttribute('role','group');
filters.setAttribute('aria-label','Filter projects by collaboration');
const gallery=el('div','filtered-project-grid');gallery.id='filtered-projects';
const resultStatus=el('p','sr-only');resultStatus.setAttribute('role','status');
const filterButtons=[];
function renderProjects(category,announce=false){
  gallery.replaceChildren();
  const filtered=cv.projects.filter(p=>category==='all'||p.category===category);
  const projects=full?filtered:['development','figma'].flatMap(kind=>filtered.filter(p=>(p.kind||'development')===kind).slice(0,2));
  const sectionTargets={development:gallery,figma:gallery};
  gallery.classList.add('individual-groups');
  [['development','Projects','Websites, mobile applications, and development work.'],['figma','Figma designs','Interface concepts, prototypes, and design explorations.']].forEach(([kind,title,description])=>{
    const matching=projects.filter(p=>(p.kind||'development')===kind);
    const section=el('div','individual-section');
    const heading=el('div','individual-divider');
    heading.append(el('h3','',!full&&kind==='development'?'Featured projects':title),el('span','individual-count',String(matching.length).padStart(2,'0')));
    const grid=el('div','filtered-project-grid');
    section.append(heading,el('p','individual-description',description),grid);
    gallery.append(section);sectionTargets[kind]=grid;
    if(!matching.length){
      const empty=el('div','project-empty');
      empty.append(el('h3','',kind==='figma'?'Design explorations coming soon':'Projects coming soon'),el('p','',kind==='figma'?'Figma designs will appear here as they are added.':'Development projects will appear here as they are added.'));
      grid.append(empty);
    }
  });
  filterButtons.forEach(({button,key})=>button.setAttribute('aria-pressed',String(key===category)));
  projects.forEach(p=>{
    const card=el('article','gallery-card');
    const preview=el(p.mobile?'a':'div','gallery-preview');
    if(p.mobile){preview.href='project.html?app='+encodeURIComponent(p.slug||p.name.toLowerCase());preview.setAttribute('aria-label','Preview '+p.name);}
    if(p.imageStyle==='app-icon')preview.classList.add('app-icon-preview');
    if(p.imageStyle==='mobile-design')preview.classList.add('mobile-design-preview');
    image(preview,p.image,p.image?p.name+' screenshot':'Add project screenshot','↗');
    const body=el('div','gallery-body');
    const meta=el('div','gallery-meta');
    const categoryLabel=p.category==='individual'?'Individual':p.category==='group'?'Group':'Project';
    meta.append(el('span','',categoryLabel+' · '+p.type));
    if(p.status)meta.append(el('span','project-status',p.status));
    const heading=el('h3','',p.name);
    if(p.mobile){const titleLink=el('a','',p.name);titleLink.href=preview.href;heading.replaceChildren(titleLink);}
    const stack=el('ul','project-stack');
    stack.setAttribute('aria-label','Technologies used');
    p.technologies.forEach(name=>{
      const item=el('li','project-tech');
      const icon=skillIcons[name.trim().toLowerCase()];
      if(icon){const img=el('img');img.src='assets/icons/'+icon+'.svg';img.alt='';img.width=19;img.height=19;item.append(img);}
      item.append(el('span','',name));stack.append(item);
    });
    body.append(meta,heading,el('p','gallery-description',p.description),stack);
    const actions=el('div','project-links');
    const sourceLink=link(p.repository,'Source code');
    if(sourceLink.tagName==='A'){
      const githubIcon=el('img','github-icon');
      githubIcon.src='assets/icons/github.svg';githubIcon.alt='';
      githubIcon.width=17;githubIcon.height=17;
      sourceLink.prepend(githubIcon);sourceLink.classList.add('source-link');
    }
    if(p.kind!=='figma')actions.append(sourceLink);
    if(p.kind==='figma')actions.append(link(p.figma||p.demo,'View Figma design'));
    else if(!p.mobile)actions.append(link(p.demo,'Live demo'));
    if(p.mobile){
      const details=el('a','text-link app-preview-link','Preview app ↗');
      details.href=preview.href;details.setAttribute('aria-label','Preview '+p.name+' app');actions.prepend(details);
    }
    if(p.apk&&!p.mobile){
      try{
        const apkUrl=new URL(p.apk,location.href);
        const local=apkUrl.origin===location.origin;
        if(apkUrl.protocol==='https:'||(local&&['http:','file:'].includes(apkUrl.protocol))){
          const download=el('a','apk-download','Download APK');
          download.href=apkUrl.href;
          const icon=el('span','','↓');icon.setAttribute('aria-hidden','true');download.prepend(icon);
          if(local)download.setAttribute('download','');
          else{download.target='_blank';download.rel='noopener noreferrer';}
          download.setAttribute('aria-label','Download '+p.name+' Android APK');
          actions.append(download);
        }
      }catch{/* Invalid APK URLs do not create a broken download control. */}
    }
    body.append(actions);card.append(preview,body);(sectionTargets[p.kind||'development']||sectionTargets.development).append(card);
  });
  if(announce)resultStatus.textContent=projects.length+' '+(category==='all'?'total':category)+' project'+(projects.length===1?'':'s')+' shown.';
}
[['all','All projects'],['individual','Individual'],['group','Group']].forEach(([key,label])=>{
  const button=el('button','project-filter',label);button.type='button';button.setAttribute('aria-controls','filtered-projects');
  button.addEventListener('click',()=>renderProjects(key,true));filterButtons.push({button,key});filters.append(button);
});
projectList.append(filters,gallery,resultStatus);
if(!full){
  const more=el('div','view-projects-row');
  const view=el('a','button primary','View all projects ↗');view.href='projects.html';more.append(view);projectList.append(more);
}
renderProjects('all');

})();
