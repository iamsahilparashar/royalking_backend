const connectToMongo = require('./db');
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT ||  5000;


var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

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