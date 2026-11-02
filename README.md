# Lemuel Brion — Personal CV & Portfolio

A responsive, dependency-free portfolio with light/dark themes, featured projects, a filtered project collection, Android app previews and APK downloads, experience photos, a certificate, and a printable résumé.

**Student:** Lemuel Brion  
**Technologies:** HTML, CSS, JavaScript; optional Node.js preview server  
**Live Vercel URL:** [Add deployed URL]  
**GitHub repository:** [Add portfolio repository URL]

## Run locally

Open this folder in VS Code and use Live Server, or run:

```sh
node server.cjs
```

Then open http://127.0.0.1:3000. Node.js is only needed for the optional server and checks. There are no packages to install.

## Files

| File | Purpose |
| --- | --- |
| index.html / script.js | Home portfolio and experience gallery |
| projects.html / projects.js | Full project collection; shared gallery renderer also powers home highlights |
| project.html / project.js | DoneIt and Financify detail pages and APK downloads |
| assets/resume/ | Uploaded PDF opened by View my résumé |
| content.js | Your profile, links, education, skills, projects, certificate, and experience |
| ui.js | Shared DOM helpers and local technology icon map |
| theme.js | Independent theme toggle with saved preferences |
| styles.css | Shared styles, portfolio layout, responsive rules, and print styling |
| project.css / projects.css | Page-specific styles |
| assets/ | Images, icons, certificate, and APKs used by the site |
| server.cjs | Optional local static server |
| check.cjs | Syntax, local asset, and content checks |
| vercel.json | Static hosting configuration |

## Edit your content

Change content.js. Use paths relative to the website root and forward slashes, for example assets/images/profile.jpg. Keep filenames and capitalization exact.

For projects:

- category: 'individual' or 'group'
- kind: 'figma' for prototypes; omit it for development projects
- image: project screenshot or app icon path
- repository: complete HTTPS source repository URL
- demo: complete HTTPS website URL
- figma: prototype URL for a Figma entry
- mobile: true for an Android app detail page
- slug: unique app identifier used by project.html?app=doneit
- apk: local APK path or direct HTTPS download URL
- screenshots: array of { src, caption } objects for app previews

The home page displays up to two development projects and two Figma designs per filter. The collection page displays all matching work. Add experience photos using a gallery array with { src, title, caption } entries. Replace the PDF in assets/resume/ to update your résumé; keep the path in index.html synchronized.

Toolkit illustrations are bundled SVG files. They do not require a CDN. Some are simplified illustrations rather than official brand artwork.

## Check the website

Run node check.cjs (or npm run check if npm is installed). It checks JavaScript syntax, linked local files, image and APK paths, and project metadata.

Before submission, manually check desktop, tablet, and mobile layouts; all filters and links; theme switching; app downloads; full-size photos; and résumé printing. Browser visual verification is still required after design changes.

## GitHub and Vercel

Preserve the .git directory to retain the development history. Create a dedicated empty GitHub repository, add it as origin, and push your main branch. Make meaningful commits as you personalize the site.

Import that repository in Vercel as a static project: framework Other, no build command, output directory . (repository root). Include all assets referenced by content.js. For APKs too large for your Git provider, host them as release assets and use their direct download URLs.

Add the final repository and Vercel URLs above, then verify both are publicly accessible before submitting them to your LMS.
