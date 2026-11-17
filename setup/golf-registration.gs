/**
 * Bangor Scholarship Foundation — golf outing registration
 *
 * Receives team registrations from the golf page on the website and adds
 * each one as a row in this Google Sheet (tab "Registrations").
 *
 * SETUP (one time, about 5 minutes):
 *  1. Create a Google Sheet (e.g. "BSF Golf Registrations").
 *  2. In the Sheet: Extensions > Apps Script. Delete what's there, paste this
 *     whole file in, and click Save.
 *  3. Click Deploy > New deployment. Click the gear next to "Select type" and
 *     choose "Web app".
 *       Execute as:      Me
 *       Who has access:  Anyone
 *     Click Deploy, then Authorize access and allow it (Google will warn the
 *     app is unverified because you wrote it: Advanced > Go to ... (unsafe)).
 *  4. Copy the "Web app URL" (ends in /exec) and paste it into GOLF_FORM_URL
 *     near the top of index.html. Push to GitHub.
 *
 * If you edit this script later: Deploy > Manage deployments > pencil icon >
 * Version: New version > Deploy. (That keeps the same URL.)
 */

// ✏️ Who gets an email for each new registration. Leave '' for no email.
var NOTIFY_EMAIL = 'president@bangorscholarshipfoundation.org';

// ✏️ Send the team contact a confirmation email? Note: it is sent from the
// Google account that owns this Sheet, so golfers will see that address.
var SEND_CONFIRMATION = false;

var SHEET_NAME = 'Registrations';
var HEADERS = ['Submitted', 'Team name', 'Golfer 1 (contact)', 'Email', 'Phone',
               'Golfer 2', 'Golfer 3', 'Golfer 4', 'Senior division', 'Notes'];
var REQUIRED = ['golfer1', 'email', 'phone', 'golfer2', 'golfer3', 'golfer4'];

function doPost(e) {
  var p = (e && e.parameter) || {};

  // Spam trap: real people never fill in the hidden "website" field.
  if (p.website) return reply({ ok: true });

  for (var i = 0; i < REQUIRED.length; i++) {
    if (!clean(p[REQUIRED[i]])) return reply({ ok: false, error: 'Missing ' + REQUIRED[i] });
  }

  var row = [new Date(), clean(p.team), clean(p.golfer1), clean(p.email), clean(p.phone),
             clean(p.golfer2), clean(p.golfer3), clean(p.golfer4),
             p.senior === 'yes' ? 'Yes' : 'No', clean(p.notes)];

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    sheet().appendRow(row);
  } finally {
    lock.releaseLock();
  }

  var summary = HEADERS.slice(1).map(function (h, n) { return h + ': ' + (row[n + 1] || '—'); }).join('\n');
  try {
    if (NOTIFY_EMAIL) {
      MailApp.sendEmail(NOTIFY_EMAIL, 'Golf registration: ' + (row[1] || row[2]), summary, { replyTo: row[3] });
    }
    if (SEND_CONFIRMATION) {
      MailApp.sendEmail(row[3], 'Your golf outing registration',
        'Thanks for registering for the Myrna & Casey Davis Memorial Golf Outing!\n\n' + summary +
        '\n\nPayment is made when you arrive. Questions? Reply to this email.\n\nBangor Scholarship Foundation');
    }
  } catch (err) {
    // The row is already saved; a mail problem shouldn't fail the registration.
  }

  return reply({ ok: true });
}

// Visiting the web app URL in a browser just confirms it's running.
function doGet() {
  return ContentService.createTextOutput('BSF golf registration is running.');
}

function sheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADERS);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  return sh;
}

// Trim, cap the length, and stop text starting with = + - @ from being
// treated as a spreadsheet formula.
function clean(v) {
  v = String(v == null ? '' : v).trim().slice(0, 1000);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
