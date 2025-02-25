// const mysql = require('mysql2/promise');

// const dbConfig = {
//   host: 'localhost',
//   user: 'prj',
//   password: 'MyP@ssw0rd123',
//   database: 'mini'
// };

// const pool = mysql.createPool(dbConfig);

// pool.getConnection()
//   .then((conn) => {
//     console.log('Connected to the database');
//     // Perform a query
//     conn.execute('SELECT * FROM your_table')
//       .then((results) => {
//         console.log(results);
//       })
//       .catch((err) => {
//         console.error(err);
//       })
//       .finally(() => {
//         // Release the connection back to the pool
//         conn.release();
//       });
//   })
//   .catch((err) => {
//     console.error(err);
//   });