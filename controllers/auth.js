
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.adminLoginpage = (req, res) => {
  res.render('auth/admin-login.ejs', { msg: '' });
};

exports.adminRegisterpage = (req, res) => {
  res.render('auth/admin-register.ejs', { msg: '' });
};

exports.adminRegister = async (req, res) => {
  const { username, password } = req.body;
  const hashedpasword=await bcrypt.hash(password,10)
  if (!username || !password) {
    return res.render('auth/admin-register.ejs', { msg: 'username and password required' });
  }
  await Admin.create({
    id: `${Date.now()}`,
    username:username,
    password:password
  });
  return res.redirect('/admin/login');
};

exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.render('auth/admin-login.ejs', { msg: 'username and password required' });
  }

  const admin = await Admin.findOne({ username:username });
  

  if (!admin) {
    return res.render('auth/admin-login.ejs', { msg: 'invalid username or password' });
  }
  //
  //let verified=await bcrypt.compare(password,admin.password)
  let verified =await admin.validatepassword (password)
  if(!verified){
     return res.render('auth/admin-login.ejs', { msg: 'invalid username or password' });
  }
//////jwt token
let token =admin.getjwt()
//   admin.sayMyName();
  //admin.showMyPassword();
  
res.cookie('admin', token, { httpOnly: true });
  return res.redirect('/admin'); 
};

exports.adminlogout = (req, res) => {
  res.clearCookie('admin');
  return res.redirect('/admin/login');
};
