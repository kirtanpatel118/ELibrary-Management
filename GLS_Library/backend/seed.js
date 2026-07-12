require('dotenv').config();
const mongoose = require('mongoose');
const Student = require('./Model/Student');
const Admin = require('./Model/Admin');

async function seed() {
  console.log('Connecting to Atlas...');
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected!\n');

  // --- Admin ---
  const adminEmail = 'admi@demo.com';
  let admin = await Admin.findOne({ email: adminEmail });
  if (admin) {
    admin.password = 'admin@321';
    await admin.save();
    console.log('Admin password updated:', adminEmail);
  } else {
    admin = new Admin({
      firstname: 'Admin',
      lastname: 'User',
      email: adminEmail,
      mobileNo: '9000000001',
      role: 'admin',
      password: 'admin@321',
    });
    await admin.save();
    console.log('Admin created:', adminEmail);
  }

  // --- Student ---
  const studentEmail = 'kalathiyakirtan118@gmail.com';
  let student = await Student.findOne({ email: studentEmail });
  if (student) {
    student.password = 'Kirtan@118';
    await student.save();
    console.log('Student password updated:', studentEmail);
  } else {
    student = new Student({
      firstname: 'Kirtan',
      lastname: 'Kalathiya',
      email: studentEmail,
      mobileNo: '7990226018',
      role: 'student',
      course: 'bca',
      enrollment: '202300719010018',
      password: 'Kirtan@118',
    });
    await student.save();
    console.log('Student created:', studentEmail);
  }

  console.log('\nDone! Both accounts are ready.');
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
