const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./Model/Student');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user  = require('./Router/user');
const admin=require('./Router/admin');
<<<<<<< HEAD
const faculty=require('./Router/faculty');

=======
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d

app.use(express.json());
app.use(cors());


app.use('/user',user);
app.use('/admin',admin);
<<<<<<< HEAD
app.use('/faculty',faculty);
=======

>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d


app.listen(3000, () => {
    console.log(`server runnig at  $http://localhost:3000 `);

});



