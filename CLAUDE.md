# Bangor Scholarship Foundation website

Single-file static site (`index.html`) for the Bangor Scholarship Foundation (BSF), Bangor, WI. Replaces the old WordPress site at bangorscholarship.com. Deployed to Vercel from the GitHub repo `jparr021/bangor-scholarship` (branch `main`); no build step.

## How the site works
- Everything (HTML, CSS, JS) lives in `index.html`. Downloadable files live in `application/` (scholarship application) and `newsletters/` (older newsletter PDFs).
- Pages are `<div id="page-NAME" class="page">` blocks, switched by `showPage('NAME')`. Pages: home, application, golf, recipients, about, bylaws, newsletters, contact, donate.
- Site-wide values (Facebook URL, PayPal URL, contact email) are JS variables near the top of `<body>`: `FB_URL`, `PAYPAL_URL`, `CONTACT_EMAIL`.
- Edit spots are marked with `✏️` comments. Search for `✏️` to find them.
- Design: red `#C8102E`, black, white (school colors). Fonts: Playfair Display + Barlow.
- Owner (Jeff) edits HTML by hand and is comfortable with it. Keep it a simple single file; do not introduce a framework or build step unless asked.
- Every Donate link goes to the Donate page (`showPage('donate')`), which has the PayPal button, mail-a-check address and impact totals.

## Yearly updates
1. **Recipients**: add a new year heading + grid at the TOP of the recipients page (copy the newest year's block). Named scholarships go in the `recipient-detail` line.
2. **Newsletter**: the full letter text goes on the Newsletters page (copy a `<details class="nl-letter">` block to the top). Then add an `nl-row` at the top of the home page list (it shows the latest 5; remove the bottom one). PDFs are optional; put them in `newsletters/`.
3. **Golf outing**: update the date, location, time and fee on the golf page, its sidebar, and the home page golf banner.
4. **Application**: update the deadline (3 places: step 3, intro paragraph, sidebar). Put the new Word/PDF files in `application/` and update the links, plus the Google Doc link.
5. **About / Donate**: update the scholarship amount, officers & board, and the "150+ scholarships / $237,900" totals on the Donate page and About page.

## Open items
- Golf "Email to register" button emails the president. Swap in an online form if one exists.
- Gerald and Marcella Horman Scholarship amount is unknown, so the About page lists it without one.
- Scholarship totals (150+, $237,900) come from the old site's Donate page and may be out of date.
- The 2020 newsletter PDF on the old site was a dead link; the 2020 letter is on the site as text only. 2022–2025 were never PDFs.
- Point the bangorscholarship.com domain at Vercel once the board is ready to retire the WordPress site.

## Deploying
Push to GitHub; Vercel redeploys automatically. To preview locally, open `index.html` in a browser (or run `python3 -m http.server` and open http://localhost:8000).
