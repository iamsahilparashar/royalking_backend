const mongoose = require('mongoose');
// const url = "mongodb://localhost:27017/RoyalKing?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
const url ="mongodb+srv://royalking:YsakvSTJCxp98MDY@royalking.axamv.mongodb.net/test-db?retryWrites=true&w=majority";



const connectToMongo =()=>{
     mongoose.connect(url,()=>{
        console.log("Connecting to Mongo");
    })
}

module.exports = connectToMongo;