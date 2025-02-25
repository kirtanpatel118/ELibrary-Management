const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./Model/Student');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user  = require('./Router/user');
const admin=require('./Router/admin');
const faculty=require('./Router/faculty');


app.use(express.json());
app.use(cors());


app.use('/user',user);
app.use('/admin',admin);
app.use('/faculty',faculty);


app.listen(3000, () => {
    console.log('server runnig at port 3000');

});



