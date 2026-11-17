# Bangor Scholarship Foundation website

Single-file static site (`index.html`) for the Bangor Scholarship Foundation (BSF), Bangor, WI. Live at https://www.bangorscholarshipfoundation.org (the bare .org and the old WordPress domain bangorscholarship.com redirect there). Domain DNS is on Vercel, including the ImprovMX mail records that forward the @bangorscholarshipfoundation.org addresses; keep those when editing DNS. Deployed to Vercel from the GitHub repo `jparr021/bangor-scholarship` (branch `main`); no build step.

## How the site works
- Everything (HTML, CSS, JS) lives in `index.html`. Downloadable files live in `application/` (scholarship application) and `newsletters/` (older newsletter PDFs).
- Pages are `<div id="page-NAME" class="page">` blocks. Pages: home, application, golf, recipients, about, bylaws, newsletters, contact, donate.
- Each page has its own shareable link: `#golf`, `#application`, etc. Link to a page with a plain `<a href="#golf">`. A second part jumps to an element on that page and opens it if it's a `<details>`: `#bylaws/article-3`, `#newsletters/nl-2023`, `#about/officers`. `route()` in the script at the bottom handles this; `showPage('NAME')` still works too.
- Site-wide values (Facebook URL, PayPal URL, contact email) are JS variables near the top of `<body>`: `FB_URL`, `PAYPAL_URL`, `CONTACT_EMAIL`. Links that use them are written `<a href="#" data-link="paypal|facebook|email">`; the script fills in the real address.
- Golf team registration: the form at `#golf/register` posts to a Google Apps Script web app (`GOLF_FORM_URL`, next to the other site-wide values), which adds a row to the "Registrations" tab of a Google Sheet and emails `NOTIFY_EMAIL`. The script and setup steps are in `setup/golf-registration.gs`. `GOLF_REGISTRATION_OPEN` (true/false) shows or hides the form and the header button. If `GOLF_FORM_URL` is empty, the form opens a pre-filled email to `CONTACT_EMAIL` instead. Teams of 4 only; fields: team name, golfer 1 (contact) name/email/phone, golfers 2–4, senior division (team), notes.
- Search/sharing tags (description, Facebook preview) are in `<head>` and use the live address `https://www.bangorscholarshipfoundation.org`. Change them if the domain moves. The Facebook preview image is `images/share.png` (1200×630); icons are `favicon.svg` and `apple-touch-icon.png`.
- Vercel Web Analytics is on (Vercel dashboard → Analytics). The script tag is in `<head>`; `route()` sends a page view each time the visitor moves to a different page, reported as `/golf`, `/donate`, etc. (Vercel's tracker ignores `#` links on its own.)
- Every link must have an `href` (keyboard and screen-reader access). Don't use `<a onclick>` without one.
- Edit spots are marked with `✏️` comments. Search for `✏️` to find them.
- Design: red `#C8102E`, black, white (school colors). Fonts: Playfair Display (headlines) + Barlow (body) + Barlow Condensed (small uppercase labels). The home page has a red hero, a black stats band, a "Class of" spotlight and a golf banner with a date block.
- Owner (Jeff) edits HTML by hand and is comfortable with it. Keep it a simple single file; do not introduce a framework or build step unless asked.
- Every Donate link goes to the Donate page (`showPage('donate')`), which has the PayPal button, mail-a-check address and impact totals.

## Yearly updates
1. **Recipients**: add a new year heading + grid at the TOP of the recipients page (copy the newest year's block). Named scholarships go in the `recipient-detail` line. Then update the "Class of" spotlight on the home page (year, amount, names).
2. **Newsletter**: the full letter text goes on the Newsletters page (copy a `<details class="nl-letter">` block to the top). Then add an `nl-row` at the top of the home page list (it shows the latest 5; remove the bottom one). PDFs are optional; put them in `newsletters/`.
3. **Golf outing**: update the date, location, time and fee on the golf page, its sidebar, and the home page golf banner. Red calendar-style date blocks (`golf-date`) appear in 3 places: the home banner, the golf page header and the golf page sidebar. In the registration Google Sheet, rename last year's "Registrations" tab (e.g. "Registrations 2027"); the script starts a fresh tab on the next sign-up.
4. **Application**: update the deadline (3 places: step 3, intro paragraph, sidebar). Put the new Word/PDF files in `application/` and update the links, plus the Google Doc link.
5. **About / Donate**: update the scholarship amount, officers & board, and the "181 scholarships / $325,900" totals on the home page stats band, the Donate page and the About page.

## Open items
- Golf registration is connected to the Sheet but switched off (`GOLF_REGISTRATION_OPEN = false`): the form and the "Register a team" button are hidden and the golf page says registration opens closer to the outing. Set it to `true` when sign-ups should open.
- Gerald and Marcella Horman Scholarship amount varies (historically about $2,500), so the About page lists it without one on purpose.
- 2027 golf entry fee is TBD; the golf page, sidebar and home banner say "to be announced". Fill it in when set.
- The 2020 newsletter PDF on the old site was a dead link; the 2020 letter is on the site as text only. 2022–2025 were never PDFs.
- Facebook may show an old preview of the site until someone runs the address through Facebook's Sharing Debugger and clicks "Scrape Again".

## Deploying
Push to GitHub; Vercel redeploys automatically. To preview locally, open `index.html` in a browser, or run `python3 -m http.server` in this folder and open http://localhost:8000. (In the Claude app's preview pane, local files open as a static copy that drops the `#page` part of the address, so test page links over the local server.)
