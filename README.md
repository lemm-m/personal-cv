# Lemuel Brion — Personal CV

A minimal, responsive personal CV website with ten assignment sections, light and dark modes, subtle entrance animations, mobile navigation, active section tracking, and a printable CV. Uses solid colors without gradients.

**Student:** Lemuel Brion  
**Technologies:** HTML5, CSS3, vanilla JavaScript; Node.js for optional local preview. No third-party dependencies.  
**Live Vercel link:** [Add your Vercel deployment URL]  
**GitHub repository:** [Add your dedicated repository URL]

## Preview

With Node.js installed, run `node server.cjs` and open http://127.0.0.1:3000. You can also open `index.html` directly. If npm is installed, `npm run dev` starts the same server.

## Personalize before submitting

Edit `content.js`. This is the central content file; no framework knowledge is needed.

- Confirm your title, introduction, career objective, current year level, and attendance dates.
- Add a professional photo to `assets/`, then set `portrait: 'assets/profile.jpg'`.
- Add GitHub, LinkedIn, and optional social URLs to `links`. Use complete `https://` URLs. Empty strings display a visible placeholder rather than a fake link.
- Add project screenshots to `assets/`, then set each project's `image`. Add verified technologies, repository URLs, and live demos.
- Add exact certificate names, dates, images, and credential links. The Cisco entry comes from the old portfolio and still needs its exact details.
- Replace bracketed entries with truthful information. Remove unused senior high school, achievement, or experience entries from their arrays.
- Review the suggested career objective and skills. Remove any skills you cannot demonstrate. Professional skills can be added to `skillGroups`.
- Contact number is optional. Email is taken from the existing public portfolio.
- Update the two submission URLs at the top of this README after deployment.

No account links or external project links have been assumed: they remain empty as requested. Nothing is uploaded from the photo or certificate placeholders. These are static placeholders, not upload controls.

## File structure

```text
assets/         Your photos, screenshots, and certificate images
content.js      Editable CV data
index.html      Semantic structure and ten numbered sections
styles.css      Layout, responsive rules, themes, animation, print styles
script.js       Content rendering, theme toggle, menu, scroll tracking
server.cjs      Optional dependency-free local preview server
vercel.json     Static deployment configuration
package.json    Optional development commands
```

## GitHub

This folder includes a local Git repository with separate implementation commits. Preserve its `.git` directory if you want to retain that history; ZIP downloads do not include it. After creating an empty dedicated repository in your GitHub account, run these commands from this folder (replace YOUR-USERNAME first):

```sh
git remote add origin https://github.com/YOUR-USERNAME/personal-cv.git
git push -u origin main
```

After your personal edits, make another meaningful commit describing the actual changes:

```sh
git add .
git commit -m "Personalize education, project evidence and professional links"
git push
```

Do not fabricate earlier development dates. The existing commits represent the actual implementation stages. If Git requests an identity for your own commits, configure your preferred GitHub name and email.

## Deploy to Vercel

1. Sign in to Vercel and create a new project by importing your dedicated GitHub repository.
2. Select **Other** as the framework preset. Use the repository root as the root directory, leave the build command empty, and use `.` as the output directory. This is a static site; `server.cjs` is for local preview only.
3. Deploy, open the generated public URL, and run the checklist below.
4. Add your verified live URL and repository URL to this README, commit, and push.
5. Submit both links to the LMS. Open them in a signed-out browser to confirm public access.

Vercel dashboard wording may vary. No Vercel deployment or GitHub remote has been created by this local build.

## Validation checklist

JavaScript syntax checks can run with `node --check script.js`, `node --check content.js`, and `node --check server.cjs`.

- Inspect at 1440px desktop, 1024px laptop, 768px tablet, and 390px mobile widths.
- Check for horizontal overflow, overlapping text, and readable image cropping.
- Toggle themes and reload; the preference should persist when browser storage is available.
- Test mobile menu opening, section navigation, and Escape to close.
- Use Tab to verify focus indicators and the skip link.
- Check every real external link, email link, screenshot, and certificate.
- Try Print CV and your browser's Save as PDF. The printed view uses light styling.
- Verify that reduced-motion device settings suppress animations.
- Remove all bracketed placeholders before your final submission.

## Explain the implementation

`index.html` defines the sections and landmarks. `content.js` stores profile data in objects and arrays. `script.js` creates DOM elements using `textContent`, renders each list, and handles interactions. CSS custom properties define theme colors; media queries adapt the layout. `IntersectionObserver` tracks visible sections and starts short entrance animations. The theme preference uses `localStorage`, with a fallback when storage is unavailable. The site has no database or contact-form backend; the email link opens the visitor's email client.

This is an editable assignment foundation. Browser visual validation, replacing missing personal content, pushing to GitHub, and deploying to Vercel remain necessary before submission.

## Latest design refinement
Typography uses Segoe UI with native system sans-serif fallbacks, without external font downloads. Interactions include copy email with status feedback, a reading progress line, back-to-top control, and subtle hover/focus feedback. Clipboard copying requires a supported secure context (HTTPS or localhost); if unavailable, the interface asks the visitor to select the address manually.


## CV section categories
Navigation now groups the CV into Profile, Experience, Skills, Community, Projects, Training, Certifications, Education, and Contact. Basic information is under Profile; GitHub, LinkedIn, and social links are under Contact. Edit the community and training arrays in content.js to replace their placeholders. Existing personal content and image/link fields remain editable in the same file.

