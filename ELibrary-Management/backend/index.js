// const express = require('express');
// const app = express();
// const cors = require('cors');
// const User = require('./Model/Student');
// const path = require('path');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const user  = require('./Router/user');
// const admin=require('./Router/admin');

// const faculty=require('./Router/faculty');




// app.use(express.json());
// app.use(cors());


// app.use('/user',user);
// app.use('/admin',admin);

// app.use('/faculty',faculty);





// app.listen(3000, () => {
//     console.log(`server runnig at  $http://localhost:3000 `);

// });

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// Import API routes
const user = require('./Router/user');
const admin = require('./Router/admin');
const faculty = require('./Router/faculty');

app.use(express.json());
app.use(cors());

// ✅ Set frontend UI path
const frontendPath = path.join('C:/Users/Dell/Music/Projects/ELibrary-Management-main/frontend/library_management');

// ✅ Serve static frontend files
app.use(express.static(frontendPath));

// ✅ Root Route - Serve index.html from the frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// ✅ API Routes
app.use('/user', user);
app.use('/admin', admin);
app.use('/faculty', faculty);

// ✅ Handle 404 errors for unknown routes
app.use((req, res, next) => {
    res.status(404).send('Page not found');
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
