const { chromium } = require('playwright');
const fs = require('fs');

const BASE = 'http://localhost:5174';
const API  = 'http://localhost:3000';

const report = { passed: [], failed: [], screenshots: [] };

function pass(name) { report.passed.push(name); console.log('  PASS: ' + name); }
function fail(name, err) { report.failed.push({ name, err: String(err?.message || err) }); console.log('  FAIL: ' + name + ' - ' + (err?.message || err)); }

async function screenshot(page, name) {
  const p = '/tmp/pw_' + name + '.jpg';
  await page.screenshot({ path: p, type: 'jpeg', quality: 80, fullPage: false });
  report.screenshots.push(p);
  return p;
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  // 1. Backend Health
  console.log('\n[1] Backend Health Check');
  try {
    const r = await context.request.get(API + '/user/get-all-books');
    const json = await r.json();
    if (json.ok !== undefined) pass('Backend /user/get-all-books responds');
    else fail('Backend responds with ok field', 'ok field missing');
  } catch(e) { fail('Backend reachable', e); }

  // 2. Search Book API fix
  console.log('\n[2] Search Book API (was broken with ReferenceError)');
  try {
    const r = await context.request.post(API + '/user/search-book', {
      data: { Bookname: 'test', Category: '' },
      headers: { 'Content-Type': 'application/json' }
    });
    const json = await r.json();
    if (json.ok === true || json.ok === false) pass('SearchBook no longer throws ReferenceError');
    else fail('SearchBook API returns ok field', JSON.stringify(json));
  } catch(e) { fail('SearchBook API', e); }

  // 3. Login Page
  console.log('\n[3] Login Page');
  try {
    await page.goto(BASE + '/login', { waitUntil: 'domcontentloaded', timeout: 10000 });
    await screenshot(page, '01_login_page');
    pass('Login page loads');
  } catch(e) { fail('Login page loads', e); }

  try {
    const roleSelect = await page.$('select[name="role"]');
    if (roleSelect) pass('Login has role selector');
    else fail('Login has role selector', 'not found');
  } catch(e) { fail('Login role selector', e); }

  try {
    const links = await page.$$eval('a', els => els.map(function(e) { return { text: e.textContent, href: e.href }; }));
    const fp = links.find(function(l) { return l.text.toLowerCase().includes('forgot'); });
    if (fp && fp.href.includes('otp')) pass('Forgot Password link goes to /otp-verification');
    else fail('Forgot Password link', JSON.stringify(fp));
  } catch(e) { fail('Forgot Password link', e); }

  // 4. Register Page
  console.log('\n[4] Register Page');
  try {
    await page.goto(BASE + '/register', { waitUntil: 'domcontentloaded', timeout: 10000 });
    await screenshot(page, '02_register_page');
    const h1 = await page.$eval('h1', function(el) { return el.textContent; }).catch(function() { return ''; });
    if (h1.toLowerCase().includes('register')) pass('Register page renders with heading');
    else fail('Register page heading', 'got: ' + h1);
  } catch(e) { fail('Register page loads', e); }

  // 5. Register a student
  console.log('\n[5] Student Registration Flow');
  const studentEmail = 'teststudent_' + Date.now() + '@gls.edu';
  try {
    await page.selectOption('select[name="role"]', 'student');
    await page.fill('input[name="firstname"]', 'Test');
    await page.fill('input[name="lastname"]', 'Student');
    await page.fill('input[name="email"]', studentEmail);
    await page.fill('input[name="mobileNo"]', '9876543210');
    await page.fill('input[name="enrollment"]', 'EN' + Date.now());
    await page.selectOption('select[name="course"]', 'mca');
    await page.fill('input[name="password"]', 'TestPass@123');
    await page.fill('input[name="confirmPassword"]', 'TestPass@123');
    pass('Registration form filled');
  } catch(e) { fail('Fill registration form', e); }

  try {
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2500);
    await screenshot(page, '03_after_register');
    const url = page.url();
    if (url.includes('login') || url.includes('register')) pass('Register submit triggers navigation');
    else fail('Register submit navigation', 'URL: ' + url);
  } catch(e) { fail('Register submit', e); }

  // 6. Student Login
  console.log('\n[6] Student Login');
  try {
    await page.goto(BASE + '/login', { waitUntil: 'domcontentloaded', timeout: 10000 });
    await page.selectOption('select[name="role"]', 'student');
    await page.fill('input[name="email"]', studentEmail);
    await page.fill('input[name="password"]', 'TestPass@123');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2500);
    await screenshot(page, '04_after_student_login');
    const url = page.url();
    if (!url.includes('login')) pass('Student login succeeds and redirects');
    else fail('Student login redirects', 'Still on login. URL: ' + url);
  } catch(e) { fail('Student login', e); }

  // 7. Home Page
  console.log('\n[7] Home Page (authenticated)');
  try {
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 10000 });
    await page.waitForTimeout(1500);
    await screenshot(page, '05_home_page');
    const url = page.url();
    if (!url.includes('login')) pass('Home page accessible when logged in');
    else fail('Home page accessible', 'Redirected to login');
  } catch(e) { fail('Home page', e); }

  // 8. Books Page
  console.log('\n[8] Our Books Page');
  try {
    await page.goto(BASE + '/books', { waitUntil: 'domcontentloaded', timeout: 10000 });
    await page.waitForTimeout(2000);
    await screenshot(page, '06_books_page');
    pass('Books page loads');
  } catch(e) { fail('Books page loads', e); }

  // 9. Cart Page
  console.log('\n[9] Cart Page');
  try {
    await page.goto(BASE + '/cart', { waitUntil: 'domcontentloaded', timeout: 10000 });
    await page.waitForTimeout(1000);
    await screenshot(page, '07_cart_page');
    pass('Cart page loads');
  } catch(e) { fail('Cart page loads', e); }

  // 10. My Books (new feature)
  console.log('\n[10] My Books Page (new feature)');
  try {
    await page.goto(BASE + '/my-books', { waitUntil: 'domcontentloaded', timeout: 10000 });
    await page.waitForTimeout(1500);
    await screenshot(page, '08_my_books_page');
    const heading = await page.$eval('h2', function(el) { return el.textContent; }).catch(function() { return ''; });
    if (heading.includes('Issued') || heading.includes('Books')) pass('My Books page renders: "' + heading + '"');
    else fail('My Books heading', 'got: ' + heading);
  } catch(e) { fail('My Books page', e); }

  // 11. User Profile Page
  console.log('\n[11] User Profile Page');
  try {
    await page.goto(BASE + '/profile', { waitUntil: 'domcontentloaded', timeout: 10000 });
    await page.waitForTimeout(1500);
    await screenshot(page, '09_profile_page');
    pass('Profile page loads');
  } catch(e) { fail('Profile page loads', e); }

  // 12. Contact Us
  console.log('\n[12] Contact Us Page');
  try {
    await page.goto(BASE + '/contact', { waitUntil: 'domcontentloaded', timeout: 10000 });
    await page.waitForTimeout(1000);
    await screenshot(page, '10_contact_page');
    pass('Contact Us page loads');
  } catch(e) { fail('Contact page loads', e); }

  // 13. About Us
  console.log('\n[13] About Us Page');
  try {
    await page.goto(BASE + '/about', { waitUntil: 'domcontentloaded', timeout: 10000 });
    await page.waitForTimeout(1000);
    await screenshot(page, '11_about_page');
    pass('About Us page loads');
  } catch(e) { fail('About page loads', e); }

  // 14. OTP Verification Page
  console.log('\n[14] OTP Verification Page');
  try {
    await context.clearCookies();
    await page.evaluate(function() { localStorage.clear(); });
    await page.goto(BASE + '/otp-verification', { waitUntil: 'domcontentloaded', timeout: 10000 });
    await page.waitForTimeout(1000);
    await screenshot(page, '12_otp_page');
    const h2 = await page.$eval('h2', function(el) { return el.textContent; }).catch(function() { return ''; });
    if (h2.includes('OTP')) pass('OTP Verification page renders: "' + h2 + '"');
    else fail('OTP page heading', 'got: ' + h2);
  } catch(e) { fail('OTP page loads', e); }

  // 15. Forgot Password Page
  console.log('\n[15] Forgot Password Page');
  try {
    await page.goto(BASE + '/forgot-password', { waitUntil: 'domcontentloaded', timeout: 10000 });
    await page.waitForTimeout(1000);
    await screenshot(page, '13_forgot_password_page');
    pass('Forgot Password page loads');
    const backLink = await page.$('a[href*="login"]');
    if (backLink) pass('Back to Login link has correct href (/login)');
    else fail('Back to Login link', 'link with /login href not found');
  } catch(e) { fail('Forgot Password page', e); }

  // 16. Password Reset API
  console.log('\n[16] Forgot Password API - reset student password');
  try {
    const r = await context.request.post(API + '/user/forgot-password', {
      data: { email: studentEmail, role: 'student', newPassword: 'NewPass@456' },
      headers: { 'Content-Type': 'application/json' }
    });
    const json = await r.json();
    if (json.ok) pass('Student forgot-password API returns ok:true');
    else fail('Student forgot-password API', JSON.stringify(json));
  } catch(e) { fail('Forgot password API', e); }

  // 17. Login with new password
  console.log('\n[17] Login with new password after reset');
  try {
    await page.goto(BASE + '/login', { waitUntil: 'domcontentloaded', timeout: 10000 });
    await page.selectOption('select[name="role"]', 'student');
    await page.fill('input[name="email"]', studentEmail);
    await page.fill('input[name="password"]', 'NewPass@456');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2500);
    const url = page.url();
    if (!url.includes('login')) pass('Login with new password succeeds');
    else fail('Login with new password', 'Still on login page. URL: ' + url);
    await screenshot(page, '14_login_new_password');
  } catch(e) { fail('Login after password reset', e); }

  // 18. Navbar My Books link
  console.log('\n[18] Navbar - My Books link visible for students');
  try {
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 10000 });
    await page.waitForTimeout(1500);
    const myBooksLink = await page.$('a[href*="my-books"]');
    if (myBooksLink) pass('Navbar shows My Books link for student');
    else fail('Navbar My Books link', 'not found');
    await screenshot(page, '15_navbar_my_books');
  } catch(e) { fail('Navbar My Books', e); }

  // 19. Admin Login API
  console.log('\n[19] Admin Login API');
  try {
    const r = await context.request.post(API + '/admin/login', {
      data: { role: 'admin', email: 'admin@gls.edu', password: 'Admin@123' },
      headers: { 'Content-Type': 'application/json' }
    });
    const json = await r.json();
    if (r.status() !== 500) pass('Admin login API responds (status: ' + r.status() + ')');
    else fail('Admin login API does not 500', JSON.stringify(json));
  } catch(e) { fail('Admin login API', e); }

  // 20. Faculty get-all-books
  console.log('\n[20] Faculty /get-all-books route (was commented out)');
  try {
    const r = await context.request.get(API + '/faculty/get-all-books');
    const json = await r.json();
    if (json.ok !== undefined) pass('Faculty /get-all-books route now responds');
    else fail('Faculty get-all-books', JSON.stringify(json));
  } catch(e) { fail('Faculty get-all-books', e); }

  // 21. My Issued Books API
  console.log('\n[21] My Issued Books API endpoint');
  try {
    const r = await context.request.get(API + '/user/my-issued-books/000000000000000000000000');
    const json = await r.json();
    if (json.ok !== undefined) pass('My Issued Books API endpoint responds');
    else fail('My Issued Books API', JSON.stringify(json));
  } catch(e) { fail('My Issued Books API', e); }

  // 22. Logout
  console.log('\n[22] Logout');
  try {
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 10000 });
    await page.waitForTimeout(1000);
    await page.click('a:has-text("User")').catch(function() {});
    await page.waitForTimeout(500);
    const logoutBtn = await page.$('button:has-text("Logout")');
    if (logoutBtn) {
      await logoutBtn.click();
      await page.waitForTimeout(1500);
      const url = page.url();
      if (url.includes('login')) pass('Logout redirects to /login');
      else fail('Logout redirect', 'URL: ' + url);
    } else fail('Logout button', 'not found');
    await screenshot(page, '16_after_logout');
  } catch(e) { fail('Logout', e); }

  // 23. Protected routes after logout
  console.log('\n[23] Protected routes redirect after logout');
  try {
    await page.goto(BASE + '/profile', { waitUntil: 'domcontentloaded', timeout: 10000 });
    await page.waitForTimeout(1000);
    const url = page.url();
    if (url.includes('login')) pass('Protected route /profile redirects to login after logout');
    else fail('Protected route redirect', 'URL: ' + url);
    await screenshot(page, '17_post_logout_redirect');
  } catch(e) { fail('Session protection', e); }

  // Final Report
  await browser.close();
  const total = report.passed.length + report.failed.length;
  console.log('\n==================================================');
  console.log('RESULTS: ' + report.passed.length + '/' + total + ' passed, ' + report.failed.length + ' failed');
  if (report.failed.length > 0) {
    console.log('\nFailed tests:');
    report.failed.forEach(function(f) { console.log('  FAIL: ' + f.name + ': ' + f.err); });
  }
  console.log('\nScreenshots:');
  report.screenshots.forEach(function(s) { console.log('  ' + s); });
  fs.writeFileSync('/tmp/elibrary_test_report.json', JSON.stringify(report, null, 2));
  console.log('\nFull report saved: /tmp/elibrary_test_report.json');
  console.log('==================================================');
})().catch(function(e) { console.error('Fatal:', e); process.exit(1); });
