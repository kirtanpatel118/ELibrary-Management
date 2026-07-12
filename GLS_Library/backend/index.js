require('dotenv').config();
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
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.get('/', (req, res) => res.json({ ok: true, message: 'GLS Library API is running' }));

app.use('/user',user);
app.use('/admin',admin);
app.use('/faculty',faculty);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
});



