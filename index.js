const connectToMongo = require('./db');
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT ||  5000;


// var corsOptions = {
//   origin: "http://localhost:3000"
// };

// app.use(cors(corsOptions));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

connectToMongo();


app.use(express.json());
app.use('/api/auth' , require('./routes/auth'))
app.use('/api/transaction' , require('./routes/transactions'))


app.get('/',(req,res)=>{
    res.send('hello world');
});

if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
    const path = require('path');
    app.get("*" , (req, res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

app.listen(port , ()=>{
    console.log("server start listening on the port",port);
});