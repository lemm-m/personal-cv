// Shared DOM helpers and locally bundled technology icons.
(() => {
function el(tag,cls,text){const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;}
function link(url,label){
  if(!url)return el('span','placeholder-link',label+' · Link to be added');
  let safe;try{safe=new URL(url);if(!['https:','mailto:','tel:'].includes(safe.protocol))throw Error();}catch{return el('span','placeholder-link',label+' · Check URL');}
  const a=el('a','text-link',label+' ↗');a.href=url;if(safe.protocol==='https:'){a.target='_blank';a.rel='noopener noreferrer';}return a;
}
function image(container,src,alt,symbol){if(src){const img=el('img');img.src=src;img.alt=alt;img.loading='lazy';container.append(img);}else{const box=el('div','image-placeholder');box.append(el('span',symbol==='LB'?'monogram':'preview-symbol',symbol),el('span','',alt));container.append(box);}}
const skillIcons={
  'c#':'csharp','csharp':'csharp','visual studio':'visual-studio',
  'sqlite':'sqlite','react':'react','dart':'dart','typescript':'typescript','postgresql':'postgresql','supabase':'supabase','vercel':'vercel',
  'html5':'html5','html':'html5','css3':'css3','css':'css3',
  'javascript':'javascript','bootstrap':'bootstrap','python':'python','java':'java',
  'git & github':'git','git':'git','visual studio code':'vscode','vscode':'vscode',
  'figma':'figma','responsive design':'responsive','ui/ux design':'design',
  'problem solving':'problem','data entry':'data-entry','workiz':'workiz',
  'housecall pro (hcp)':'housecall','housecall pro':'housecall','hcp':'housecall',
  'gohighlevel (ghl)':'gohighlevel','gohighlevel':'gohighlevel','go highlevel':'gohighlevel','ghl':'gohighlevel'
};
window.cvUI = { el, link, image, skillIcons };
})();
