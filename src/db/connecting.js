const mongoose = require('mongoose');
require('dotenv').config();
async function main(){
    try{
        await mongoose.connect("mongodb://localhost:27017/school");
    }
    catch(err){
        console.log(err)
    }
} 
main();