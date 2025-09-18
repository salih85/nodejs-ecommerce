const mongoose=require('mongoose');

const CatSchema ={
    id :{
        type:String,
    },
    name:{
        type:String,
    },
}
module.exports =mongoose.model('Category',CatSchema);