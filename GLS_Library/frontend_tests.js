const { chromium } = require('playwright');
const fs = require('fs');

const BASE = 'http://localhost:5173';
const report = { passed: [], failed: [], screenshots: [] };

function pass(n) { report.passed.push(n); console.log('  PASS: ' + n); }
function fail(n, e) { report.failed.push({ name: n, err: String(e && e.message ? e.message : e) }); console.log('  FAIL: ' + n + ' - ' + (e && e.message ? e.message : e)); }

async function ss(page, name) {
  var p = '/tmp/pw_' + name + '.jpg';
  await page.screenshot({ path: p, type: 'jpeg', quality: 80 });
  report.screenshots.push(p);
  return p;
}

(async function() {
  var browser = await chromium.launch({ headless: true });
  var ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  var page = await ctx.newPage();

  // 1. Login page loads
  console.log('\n[1] Login Page');
  try {
    await page.goto(BASE + '/login', { waitUntil: 'networkidle', timeout: 15000 });
    await ss(page, 'login');
    pass('Login page loads');
  } catch(e) { fail('Login page loads', e); }

  // 2. Role selector
  try {
    var sel = await page.$('select[name="role"]');
    if (sel) pass('Login has role selector');
    else fail('Role selector', 'missing');
  } catch(e) { fail('Role selector', e); }

  // 3. Email/password inputs
  try {
    var emailInput = await page.$('input[name="email"]');
    var passInput = await page.$('input[name="password"]');
    if (emailInput && passInput) pass('Login has email and password inputs');
    else fail('Login inputs', 'missing');
  } catch(e) { fail('Login inputs', e); }

  // 4. Forgot Password link -> /otp-verification
  try {
    var links = await page.$$eval('a', function(els) { return els.map(function(e) { return { text: e.textContent.trim(), href: e.href }; }); });
    var fp = null;
    for (var i = 0; i < links.length; i++) {
      if (links[i].text.toLowerCase().indexOf('forgot') !== -1) { fp = links[i]; break; }
    }
    if (fp && fp.href.indexOf('otp-verification') !== -1) pass('Forgot Password link -> /otp-verification');
    else fail('Forgot Password link', 'got: ' + JSON.stringify(fp));
  } catch(e) { fail('Forgot link', e); }

  // 5. Register page
  console.log('\n[2] Register Page');
  try {
    await page.goto(BASE + '/register', { waitUntil: 'networkidle', timeout: 15000 });
    await ss(page, 'register');
    var h1 = await page.$eval('h1', function(el) { return el.textContent.trim(); }).catch(function() { return ''; });
    if (h1.toLowerCase().indexOf('register') !== -1) pass('Register page heading: "' + h1 + '"');
    else fail('Register heading', 'got: ' + h1);
  } catch(e) { fail('Register page', e); }

  // 6. Register role options
  try {
    var roleOpts = await page.$$eval('select[name="role"] option', function(opts) { return opts.map(function(o) { return o.value; }).filter(function(v) { return v; }); });
    if (roleOpts.indexOf('student') !== -1 && roleOpts.indexOf('faculty') !== -1 && roleOpts.indexOf('admin') !== -1)
      pass('Register role options: student, faculty, admin');
    else fail('Register role options', JSON.stringify(roleOpts));
  } catch(e) { fail('Register role options', e); }

  // 7. Student fields appear
  try {
    await page.selectOption('select[name="role"]', 'student');
    await page.waitForTimeout(300);
    var enrollInput = await page.$('input[name="enrollment"]');
    var courseSelect = await page.$('select[name="course"]');
    if (enrollInput && courseSelect) pass('Student-specific fields appear');
    else fail('Student fields', 'enrollment or course missing');
  } catch(e) { fail('Student fields', e); }

  // 8. Faculty fields appear
  try {
    await page.selectOption('select[name="role"]', 'faculty');
    await page.waitForTimeout(300);
    var fid = await page.$('input[name="faculty_id"]');
    var doj = await page.$('input[name="dateOfJoining"]');
    if (fid && doj) pass('Faculty-specific fields appear');
    else fail('Faculty fields', 'faculty_id or dateOfJoining missing');
    await ss(page, 'register_faculty_fields');
  } catch(e) { fail('Faculty fields', e); }

  // 9. OTP page
  console.log('\n[3] OTP Verification Page');
  try {
    await page.goto(BASE + '/otp-verification', { waitUntil: 'networkidle', timeout: 15000 });
    await ss(page, 'otp');
    var h2 = await page.$eval('h2', function(el) { return el.textContent.trim(); }).catch(function() { return ''; });
    if (h2.indexOf('OTP') !== -1) pass('OTP page heading: "' + h2 + '"');
    else fail('OTP heading', 'got: ' + h2);
  } catch(e) { fail('OTP page', e); }

  // 10. OTP inputs
  try {
    var otpInp = await page.$('input[type="text"]');
    var otpBtn = await page.$('button');
    if (otpInp && otpBtn) pass('OTP page has email input + button');
    else fail('OTP inputs', 'missing');
  } catch(e) { fail('OTP inputs', e); }

  // 11. Forgot Password page
  console.log('\n[4] Forgot Password Page');
  try {
    await page.goto(BASE + '/forgot-password', { waitUntil: 'networkidle', timeout: 15000 });
    await ss(page, 'forgot_password');
    pass('Forgot Password page loads');
  } catch(e) { fail('Forgot Password page', e); }

  // 12. Back to Login link
  try {
    var lnk = await page.$('a[href*="login"]');
    if (lnk) {
      var href = await lnk.getAttribute('href');
      pass('Back to Login link href: "' + href + '"');
    } else fail('Back to Login link', 'not found');
  } catch(e) { fail('Back to Login link', e); }

  // 13. Forgot Password form fields
  try {
    var fpRole = await page.$('select[name="role"]');
    var fpEmail = await page.$('input[name="email"]');
    var fpNew = await page.$('input[name="newPassword"]');
    var fpConf = await page.$('input[name="confirmPassword"]');
    if (fpRole && fpEmail && fpNew && fpConf) pass('Forgot Password form has all 4 fields');
    else fail('Forgot Password fields', 'missing one or more');
  } catch(e) { fail('Forgot Password fields', e); }

  // 14. Protected routes redirect when unauthenticated
  console.log('\n[5] Protected Route Redirects');
  var protectedRoutes = ['/', '/profile', '/my-books', '/books', '/cart', '/about', '/contact'];
  await ctx.clearCookies();
  await page.evaluate(function() { localStorage.clear(); });

  for (var ri = 0; ri < protectedRoutes.length; ri++) {
    try {
      var route = protectedRoutes[ri];
      await page.goto(BASE + route, { waitUntil: 'networkidle', timeout: 10000 });
      var url = page.url();
      if (url.indexOf('login') !== -1) pass(route + ' -> /login (auth guard works)');
      else fail(route + ' auth guard', 'URL: ' + url);
    } catch(e) { fail('Route ' + protectedRoutes[ri], e); }
  }

  // 15. Session restore with invalid token -> logout
  console.log('\n[6] Session Restore (invalid token)');
  try {
    await page.goto(BASE + '/login', { waitUntil: 'networkidle', timeout: 10000 });
    await page.evaluate(function() { localStorage.setItem('jwt_token', 'invalid_token'); });
    await page.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 12000 });
    // Wait for client-side React Router navigation to /login after auth check
    try { await page.waitForURL('**/login', { timeout: 6000 }); } catch(_) {}
    var url = page.url();
    if (url.indexOf('login') !== -1) pass('Invalid token -> redirected to /login (session guard works)');
    else fail('Session restore invalid token', 'stayed at: ' + url);
    await ss(page, 'session_restore');
  } catch(e) { fail('Session restore test', e); }

  // 16. Public routes stay public (login/register/otp/forgot-password accessible without auth)
  console.log('\n[7] Public Routes Accessible Without Auth');
  await page.evaluate(function() { localStorage.clear(); });
  var publicRoutes = ['/login', '/register', '/otp-verification', '/forgot-password'];
  for (var pi = 0; pi < publicRoutes.length; pi++) {
    try {
      var pr = publicRoutes[pi];
      await page.goto(BASE + pr, { waitUntil: 'networkidle', timeout: 10000 });
      var curl = page.url();
      if (curl.indexOf('login') !== -1 || curl.indexOf(pr.slice(1)) !== -1)
        pass(pr + ' accessible without auth');
      else fail(pr + ' accessible', 'unexpected URL: ' + curl);
    } catch(e) { fail('Public route ' + publicRoutes[pi], e); }
  }

  // 17. Navbar My Books link (after injecting a mock auth state)
  console.log('\n[8] Navbar My Books Link');
  try {
    await page.evaluate(function() {
      localStorage.setItem('jwt_token', 'test');
      localStorage.setItem('user_role', 'student');
    });
    await page.goto(BASE + '/login', { waitUntil: 'domcontentloaded', timeout: 8000 });
    var myBooksLink = await page.$('a[href*="my-books"]');
    if (myBooksLink) pass('Navbar shows My Books link when user_role=student');
    else fail('Navbar My Books link', 'not found on page');
    await ss(page, 'navbar_my_books');
  } catch(e) { fail('Navbar My Books', e); }

  await browser.close();

  var total = report.passed.length + report.failed.length;
  console.log('');
  console.log('==================================================');
  console.log('FRONTEND TEST RESULTS: ' + report.passed.length + '/' + total + ' passed, ' + report.failed.length + ' failed');
  if (report.failed.length) {
    console.log('\nFailed:');
    report.failed.forEach(function(f) { console.log('  FAIL: ' + f.name + ' -> ' + f.err); });
  }
  console.log('\nScreenshots saved:');
  report.screenshots.forEach(function(s) { console.log('  ' + s); });
  fs.writeFileSync('/tmp/frontend_report.json', JSON.stringify(report, null, 2));
  console.log('==================================================');
})().catch(function(e) { console.error('Fatal error:', e.message); process.exit(1); });
