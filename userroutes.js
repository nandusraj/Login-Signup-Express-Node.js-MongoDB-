const express=require('express');
const User=require('./usermodel');
const bcrypt=require('bcryptjs');
const mongoose=require('mongoose')
const jwt = require('jsonwebtoken');
const app=express();



//Login
app.post('/login',(req,res)=>{
    console.log(req.body);
    const query={username:req.body.username} ;    
    User.findOne(       
        query,(err,user)=>{
        if(err){
            console.log(err);
        }
        console.log(user);
        
        if(!user){
            res.json({message:'Username not found'});                     
        }             
        
         bcrypt.compare(req.body.password,user.password,(err,success)=>{
             if(success){
                 jwt.sign(user.toObject(),'123ghf',(err,token)=>{
                     console.log(token);
                     if(token){
                         res.json({message:token});
                     }
                     res.json({message:'Token generation failed'});
                 })                                 
             }
             if(!success){
                res.json({message:'Incorrect Password'});
             }
             console.log(err);
         })
         
    })
})

//Register

app.post('/register',(req,res)=>{
    console.log(req.body);
    var salt=bcrypt.genSaltSync(10);
    var hash=bcrypt.hashSync(req.body.password,salt);
    const newUser=new User({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        username:req.body.username,
        password:hash,
        contact:req.body.contact
    });
    newUser.save().
    then(
        (result)=>{
            res.status(200).json({name:newUser.name,contact:newUser.contact});
        }
    )
    .catch((err)=>{
        console.log(err);
        res.status(200).json({name:'Failed',contact:'Failed'});
    })
})
module.exports=app;
