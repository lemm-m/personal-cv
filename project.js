(() => {
  const get=id=>document.getElementById(id);
  const slug=new URLSearchParams(location.search).get('app');
  const app=window.cv.projects.find(p=>p.mobile&&(p.slug||p.name.toLowerCase())===slug);
  if(!app){get('app-missing').hidden=false;return;}
  function el(tag,cls,text){const n=document.createElement(tag);if(cls)n.className=cls;if(text)n.textContent=text;return n;}
  function safeUrl(value){try{const u=new URL(value,location.href);return u.protocol==='https:'||(u.origin===location.origin&&['http:','file:'].includes(u.protocol))?u:null;}catch{return null;}}
  document.title=app.name+' — Lemuel Brion';
  get('app-details').hidden=false;
  get('app-icon').src=app.image;
  get('app-category').textContent='ANDROID APP · '+app.type.toUpperCase();
  get('app-name').textContent=app.name;
  get('app-description').textContent=app.overview||app.description;
  const apk=app.apk&&safeUrl(app.apk);
  if(apk){
    const button=el('a','app-primary','↓ Download APK');button.href=apk.href;
    if(apk.origin===location.origin)button.setAttribute('download','');
    else{button.target='_blank';button.rel='noopener noreferrer';}
    get('app-actions').append(button);get('apk-info').textContent='Android · APK download';
  }else{
    const button=el('button','app-primary','↓ Download APK');button.disabled=true;
    get('app-actions').append(button);get('apk-info').textContent='Android · APK download will be available when the file is added.';
  }
  const repository=safeUrl(app.repository);
  if(repository){
    const link=el('a','app-secondary','View repository ↗');link.href=repository.href;link.target='_blank';link.rel='noopener noreferrer';
    const img=el('img','github-icon');img.src='assets/icons/github.svg';img.alt='';img.width=18;img.height=18;link.prepend(img);get('app-actions').append(link);
  }
  const icons={dart:'dart',sqlite:'sqlite'};
  (app.technologies||[]).forEach(name=>{
    const chip=el('span','project-tech');const icon=icons[name.toLowerCase()];
    if(icon){const img=el('img');img.src='assets/icons/'+icon+'.svg';img.alt='';chip.append(img);}
    chip.append(document.createTextNode(name));get('app-tools').append(chip);
  });
  const screenshots=app.screenshots||[];
  get('screen-count').textContent=screenshots.length?screenshots.length+' SCREENS':'SCREENSHOTS COMING SOON';
  if(screenshots.length){
    screenshots.forEach((screen,i)=>{
      const figure=el('figure','app-screen');const a=el('a');a.href=screen.src;a.target='_blank';a.rel='noopener noreferrer';
      const img=el('img');img.src=screen.src;img.alt=screen.caption||app.name+' screen '+(i+1);img.loading='lazy';a.append(img);
      figure.append(a,el('figcaption','',screen.caption||'Screen '+(i+1)));get('app-screenshots').append(figure);
    });
  }else{
    const empty=el('div','app-preview-empty');
    empty.append(el('span','', 'Preview gallery'),el('p','','App screenshots will be added here.'));
    get('app-screenshots').append(empty);
  }
})();
