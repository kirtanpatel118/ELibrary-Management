const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'backend', '.env') });

const DB_URI = process.env.MONGODB_URI;
const DB_FOLDER = path.join(__dirname, 'database');

// Map filename -> collection name
const files = [
  { file: 'GLS_Library.admins.json',      collection: 'admins' },
  { file: 'GLS_Library.books.json',        collection: 'books' },
  { file: 'GLS_Library.contacts.json',     collection: 'contacts' },
  { file: 'GLS_Library.faculties.json',    collection: 'faculties' },
  { file: 'GLS_Library.issuedbooks.json',  collection: 'issuedbooks' },
  { file: 'GLS_Library.students.json',     collection: 'students' },
];

function parseExtendedJSON(data) {
  // Convert $oid -> ObjectId, $date -> Date
  return JSON.parse(data, (key, value) => {
    if (value && typeof value === 'object') {
      if (value.$oid) return new mongoose.Types.ObjectId(value.$oid);
      if (value.$date) return new Date(value.$date);
      if (value.$numberDouble) return parseFloat(value.$numberDouble);
      if (value.$numberInt) return parseInt(value.$numberInt);
      if (value.$numberLong) return parseInt(value.$numberLong);
    }
    return value;
  });
}

async function importAll() {
  console.log('Connecting to Atlas...');
  await mongoose.connect(DB_URI);
  console.log('Connected!\n');

  const db = mongoose.connection.db;

  for (const { file, collection } of files) {
    const filePath = path.join(DB_FOLDER, file);
    if (!fs.existsSync(filePath)) {
      console.log(`SKIP: ${file} not found`);
      continue;
    }

    const raw = fs.readFileSync(filePath, 'utf8');
    const docs = parseExtendedJSON(raw);

    if (!docs || docs.length === 0) {
      console.log(`SKIP: ${file} is empty`);
      continue;
    }

    const col = db.collection(collection);

    // Drop existing data in collection first
    await col.deleteMany({});

    // Insert all documents
    const result = await col.insertMany(docs, { ordered: false });
    console.log(`IMPORTED: ${collection} — ${result.insertedCount} documents`);
  }

  console.log('\nAll done! Data is now live on Atlas.');
  await mongoose.disconnect();
}

importAll().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
