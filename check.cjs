// Run with `node check.cjs`; no installed dependencies are needed.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const root = __dirname;
const files = fs.readdirSync(root);

for (const file of files.filter(name => /\.(?:js|cjs)$/.test(name))) {
  execFileSync(process.execPath, ['--check', path.join(root, file)]);
}

let checked = 0;
function checkAsset(value) {
  if (!value || /^(?:[a-z]+:|#)/i.test(value)) return;
  const target = decodeURIComponent(value.split(/[?#]/)[0]);
  assert(fs.existsSync(path.join(root, target)), `Missing local file: ${target}`);
  checked++;
}

for (const file of files.filter(name => name.endsWith('.html'))) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(ids.length, new Set(ids).size, `Duplicate IDs in ${file}`);
  for (const match of html.matchAll(/\b(?:src|href)="([^"]+)"/g)) {
    checkAsset(match[1]);
    if (match[1].startsWith('#')) {
      assert(ids.includes(match[1].slice(1)), `Missing anchor in ${file}: ${match[1]}`);
    }
  }
}

const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'content.js'), 'utf8'), context);
const cv = context.window.cv;
checkAsset(cv.portrait);
const slugs = new Set();
for (const project of cv.projects) {
  assert(['individual', 'group'].includes(project.category), `Invalid category: ${project.name}`);
  for (const key of ['image', 'apk']) checkAsset(project[key]);
  for (const screen of project.screenshots || []) checkAsset(screen.src);
  if (project.mobile) {
    assert(project.slug && !slugs.has(project.slug), `Missing or duplicate app slug: ${project.name}`);
    slugs.add(project.slug);
  }
}
for (const item of cv.achievements) checkAsset(item.image);
for (const item of cv.experience) {
  for (const photo of item.gallery || []) checkAsset(photo.src);
}
console.log(`Passed JavaScript syntax, HTML anchors, ${checked} local file references, and project metadata.`);
