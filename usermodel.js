const mongoose=require('mongoose');

UserSchema=new mongoose.Schema({
    name:String,
    username:{type:String,required:true},
    password:{type:String,required:true},
    contact:String    
});
module.exports=mongoose.model('User',UserSchema);