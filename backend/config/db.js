const mongoose = require("mongoose")
const colors=require('colors')
const connectDB=async()=>{
    try{
        const conn=await mongoose.connect('mongodb+srv://me:Tejaswini@cluster0.462lywd.mongodb.net/?retryWrites=true&w=majority',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify:true,
        });
        console.log(`MONGODB connected: ${conn.connection.host}`.cyan.underline)
    }catch(error){
       console.log(`Error : ${error.message}`.red.bold);
       process.exit();
    }
};
module.exports=connectDB;