const mongoose=require('mongoose');
const express=require('express');


const app=express();


//Middlewares

//CORS Middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,GET,PATCH,DELETE');
    }
    next();
  });
  
app.use(express.json());

const PORT=4000;
//RouteHandlers

app.use('/menuitems',require('./routes'));
app.use('/user',require('./userroutes'));
//DbConnection
const url='mongodb+srv://nanduSRaj:mongodb@samplemongoapp-jjmuf.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(url,{useNewUrlParser:true}).then(
 ()=>{console.log('DB Connected')})




app.listen(PORT,()=>{console.log("Listening to port no "+PORT);});