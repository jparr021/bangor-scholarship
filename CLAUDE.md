# Bangor Scholarship Foundation website

Single-file static site (`index.html`) for the Bangor Scholarship Foundation (BSF), Bangor, WI. Replaces the old WordPress site at bangorscholarship.com. Deployed to Vercel from a GitHub repo; no build step.

## How the site works
- Everything (HTML, CSS, JS) lives in `index.html`.
- Pages are `<div id="page-NAME" class="page">` blocks, switched by `showPage('NAME')`. Pages: home, application, golf, recipients, about, bylaws, contact, donate.
- Site-wide values (Facebook URL, PayPal URL, contact email) are JS variables near the top of `<body>`: `FB_URL`, `PAYPAL_URL`, `CONTACT_EMAIL`.
- Edit spots are marked with `✏️` comments. Search for `✏️` to find them.
- Design: red `#C8102E`, black, white (school colors). Fonts: Playfair Display + Barlow.
- Owner (Jeff) edits HTML by hand and is comfortable with it. Keep it a simple single file; do not introduce a framework or build step unless asked.

## Yearly updates
1. **Recipients**: add a new year heading + grid at the TOP of the recipients page (copy the newest year's block). Named scholarships go in the `recipient-detail` line.
2. **Newsletter**: add a `nl-row` at the top of the newsletter list on the home page and put the PDF in `newsletters/`.
3. **Golf outing**: update the date, location, time and fee on the golf page, its sidebar, and the home page golf banner.
4. **Application**: update the deadline (3 places: step 3, intro paragraph, sidebar) and the Google Doc / Word / PDF links.

## Open items (placeholders still in the file)
- `FB_URL` is a placeholder (`YourPageHere`). Needs the real BSF Facebook page.
- `PAYPAL_URL` is a placeholder (`YOURCODE`). Needs the real PayPal donate link.
- `CONTACT_EMAIL` is `info@bangorscholarship.com`, which is unconfirmed. The application page uses `president@bangorscholarshipfoundation.org` (Kelly Peterson).
- Contact page mailing address says `PO Box 123`. The application says `P.O. Box 201, Bangor, WI 54614`, so this is likely wrong.
- Newsletter list stops at 2024, and the PDFs are not in `newsletters/` yet. The old site has the 2025 newsletter; add it too.
- Application download links still point at files on the old WordPress site (bangorscholarship.com/wp-content/...). They break if that site goes away, so move the files into this repo (e.g. `application/`).
- By Laws and About text were copied from the old site. The Officers & Board and Scholarship Amount pages on the old site (`/what-is-bsf/officers-board-of-directors/`, `/what-is-bsf/scholarship-amount/`) have not been imported yet.
- The Donate page's $25 / $100 buttons all go to the same PayPal link.

## Deploying
Push to GitHub; Vercel redeploys automatically. Preview locally with `python3 -m http.server` and open http://localhost:8000.
