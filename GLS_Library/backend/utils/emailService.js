const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

/* ─── Shared Layout Wrappers ────────────────────────────────────────────── */

const emailWrapper = (bodyContent) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="520" cellpadding="0" cellspacing="0"
          style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);max-width:520px;">

          <!-- Header -->
          <tr>
            <td style="background:#134B70;padding:28px 36px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:1px;">
                GLS E-Library
              </h1>
              <p style="margin:4px 0 0;color:#a8d8ea;font-size:13px;">GLS University, Ahmedabad</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              ${bodyContent}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9f9f9;padding:20px 40px;text-align:center;border-top:1px solid #eee;">
              <p style="margin:0;color:#aaa;font-size:12px;">
                &copy; 2024 GLS Library &bull; Netaji Road, Opp. Law Garden, Ellisbridge, Ahmedabad – 380006<br/>
                <a href="mailto:inquiry@glsuniversity.ac.in"
                   style="color:#134B70;text-decoration:none;">inquiry@glsuniversity.ac.in</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

const divider = `<div style="border-top:1px solid #eee;margin:24px 0;"></div>`;

const note = (text) =>
  `<p style="margin:0;color:#999;font-size:12px;line-height:1.6;">${text}</p>`;

/* ─── Template 1: Welcome / Registration ────────────────────────────────── */

const welcomeTemplate = (name, role) =>
  emailWrapper(`
    <h2 style="margin:0 0 8px;color:#134B70;font-size:20px;">Welcome to GLS E-Library! 🎉</h2>
    <p style="margin:0 0 20px;color:#555;font-size:14px;line-height:1.7;">
      Hi <strong>${name}</strong>,<br/>
      Your account has been successfully created as a <strong>${role.charAt(0).toUpperCase() + role.slice(1)}</strong>.
      You can now log in and start exploring thousands of books in the GLS E-Library collection.
    </p>

    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="background:#f0f7ff;border-left:4px solid #134B70;border-radius:4px;padding:14px 18px;">
          <p style="margin:0;color:#134B70;font-size:13px;font-weight:600;">What you can do:</p>
          <ul style="margin:8px 0 0 0;padding-left:18px;color:#555;font-size:13px;line-height:1.8;">
            <li>Browse and search our book catalogue</li>
            <li>Request books for issue</li>
            <li>Track your issued books</li>
            <li>Manage your profile</li>
          </ul>
        </td>
      </tr>
    </table>

    ${divider}
    ${note('If you did not create this account, please contact the library immediately at inquiry@glsuniversity.ac.in.')}
  `);

/* ─── Template 2: Book Issue Request Submitted ──────────────────────────── */

const bookIssueTemplate = (name, books, returnByDate) => {
  const bookRows = books
    .map(
      (b) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#333;font-size:13px;">
          📖 ${b.Bookname || b.name || 'Book'}
        </td>
        <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#777;font-size:13px;text-align:right;">
          ${b.Author || ''}
        </td>
      </tr>`
    )
    .join('');

  return emailWrapper(`
    <h2 style="margin:0 0 8px;color:#134B70;font-size:20px;">Book Issue Request Submitted</h2>
    <p style="margin:0 0 20px;color:#555;font-size:14px;line-height:1.7;">
      Hi <strong>${name}</strong>,<br/>
      Your book issue request has been submitted successfully and is pending <strong>admin approval</strong>.
      You will be notified once the request is processed.
    </p>

    <p style="margin:0 0 10px;color:#134B70;font-size:14px;font-weight:600;">Requested Books:</p>
    <table width="100%" cellpadding="0" cellspacing="0"
      style="border:1px solid #eee;border-radius:8px;overflow:hidden;">
      <thead>
        <tr style="background:#134B70;">
          <th style="padding:10px 14px;color:#fff;font-size:12px;text-align:left;">Book Title</th>
          <th style="padding:10px 14px;color:#fff;font-size:12px;text-align:right;">Author</th>
        </tr>
      </thead>
      <tbody>
        ${bookRows}
      </tbody>
    </table>

    ${
      returnByDate
        ? `<p style="margin:16px 0 0;color:#e74c3c;font-size:13px;">
            📅 <strong>Return By:</strong> ${returnByDate}
          </p>`
        : ''
    }

    ${divider}
    ${note('⏳ Please wait for admin approval before collecting the books from the library counter.')}
  `);
};

/* ─── Template 3: Book Return Confirmed ─────────────────────────────────── */

const bookReturnTemplate = (name, bookName) =>
  emailWrapper(`
    <h2 style="margin:0 0 8px;color:#134B70;font-size:20px;">Book Return Confirmed ✅</h2>
    <p style="margin:0 0 20px;color:#555;font-size:14px;line-height:1.7;">
      Hi <strong>${name}</strong>,<br/>
      The following book has been successfully returned and recorded in our system:
    </p>

    <div style="text-align:center;margin:0 0 24px;">
      <div style="display:inline-block;background:#f0f7ff;border:2px solid #134B70;
                  border-radius:10px;padding:16px 32px;">
        <p style="margin:0;font-size:16px;font-weight:700;color:#134B70;">📖 ${bookName}</p>
      </div>
    </div>

    <p style="margin:0 0 16px;color:#555;font-size:14px;line-height:1.7;">
      Thank you for returning the book on time. You are now free to borrow other books from the GLS E-Library.
    </p>

    ${divider}
    ${note('If you believe this return was recorded in error, please visit the library counter or contact us.')}
  `);

/* ─── Template 4: Password Reset Successful ─────────────────────────────── */

const passwordResetTemplate = (name) =>
  emailWrapper(`
    <h2 style="margin:0 0 8px;color:#134B70;font-size:20px;">Password Reset Successful 🔐</h2>
    <p style="margin:0 0 20px;color:#555;font-size:14px;line-height:1.7;">
      Hi <strong>${name}</strong>,<br/>
      Your GLS E-Library account password has been <strong>reset successfully</strong>.
      You can now log in using your new password.
    </p>

    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="background:#fff8e1;border-left:4px solid #f39c12;border-radius:4px;padding:14px 18px;">
          <p style="margin:0;color:#b7791f;font-size:13px;font-weight:600;">Security Reminder</p>
          <p style="margin:6px 0 0;color:#555;font-size:13px;line-height:1.6;">
            If you did not request this password reset, your account may be compromised.
            Please contact the library immediately.
          </p>
        </td>
      </tr>
    </table>

    ${divider}
    ${note('🔒 Never share your password with anyone, including library staff.')}
  `);

/* ─── Sender Utility ─────────────────────────────────────────────────────── */

const sendEmail = (to, subject, html) => {
  return transporter.sendMail({
    from: `"GLS Library" <${process.env.EMAIL}>`,
    to,
    subject,
    html,
  });
};

module.exports = {
  sendEmail,
  welcomeTemplate,
  bookIssueTemplate,
  bookReturnTemplate,
  passwordResetTemplate,
};
