const jwt = require('jsonwebtoken');
const JWT_SECRET = "Royal King";

const fetchuser = (req, res , next) => {
    const token = req.header('auth-token');
    if(!token){
        res.status(400).send({error: 'plz authenticate using a valid token'});
    }
    try{
        const data = jwt.verify(token , JWT_SECRET);
        req.user = data.user;
        next();
    }catch(e){
        res.status(400).send({error : "plz authenticate using a valid token"})

    }
}

module.exports = fetchuser;