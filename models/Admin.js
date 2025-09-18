const mongoose = require('mongoose');
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    default: "Admin"
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,   // removed select:false for now
    required: true
  }
});

// adminSchema.methods.sayMyName = function() {
//     console.log("My name is " + this.username);
// };

// adminSchema.methods.showMyPassword = function() {
//     console.log("My password is " + this.password);
//};

adminSchema.methods.validatepassword = async function(userpassword) {
return await bcrypt.compare(userpassword,this.password)
};

//jwt token
adminSchema.methods.getjwt=function(){
  let token=jwt.sign({
    name:this.name,
    username:this.username
  },process.env.JWT_SCRET);
  //},'jwtsecret',{expiresIn:'ih'});
  return token;
}


adminSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        return next();
    }
        this.password = await bcrypt.hash(this.password, 10);
    return next();
});

module.exports = mongoose.model('Admin', adminSchema);



