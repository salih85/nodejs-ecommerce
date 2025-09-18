require('dotenv').config();
//console.log(process.env)

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

const connectDB = require('./confiq/db');
const auth = require('./routes/auth');
const admin = require('./routes/admin');
const user = require('./routes/users');
const { adminOnly } = require('./middlewears/auth');

app.use('/', auth);
app.use('/admin', adminOnly, admin);
app.use('/', user);

app.listen(3000, () => {
  console.log("server started at port 3000");
  connectDB();
});
