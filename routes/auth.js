const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "Royal King";
const fetchuser = require('../middleware/fecthuser')


//Route 1 :  creating a user using POST no login required
router.post('/createuser', [
    body('name', "Enter a valid name").isLength({ min: 3 }),
    body('email', "Enter a valid email").isEmail(),
    body('phn', "Number should be of 10 digits").isLength({ min: 10 }),
    body('address', "Enter a valid address").isLength({ min: 5 }),
    body('password').isLength({ min: 5 }),

], async (req, res) => {
    // if there are  error , return bad request and the error
    const errors = validationResult(req);
    let success = false;

    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        let phnCheck = await User.findOne({ phn: req.body.phn });
        if (user) {
            return res.status(400).json({ success: success, error: "user with this  email already exists" });
        }
        if (phnCheck) {
            return res.status(400).json({ success: success, error: "user with this  phone number already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            phn: req.body.phn,
            email: req.body.email,
            address: req.body.address,
            password: secPass,
        })

        const data = {
            user: {
                id: user.id
            }
        }

        success = true;
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ "success": success, "authtoken": authtoken });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal server error");
    }
})


//Route 2 :  log in a user using POST no login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('phn', 'Enter a valid phone no').isLength({ min: 10 }),
    body('password', 'Enter a valid password').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    let success = false;

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: "Invalid credentials" })
    }

    const { email, phn } = req.body;
    try {
        let user = await User.findOne({ email });
        let phnCheck = await User.findOne({ phn });

        if (!user) {
            return res.status(400).json({ success: success, error: "please try to login with correct credentials" });
        }
        if (!phnCheck) {
            return res.status(400).json({ success: success, error: "please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id,
            }
        }

        success = true;
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ "success": success, "authtoken": authtoken });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal server error");
    }
})

//Route 3 getting user details login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userid = req.user.id;
        const user = await User.findById(userid).select("-password");
        res.send(user);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal server error");
    }
})

// route 4 :  updating balance of user
router.patch('/updatebalance/:id', fetchuser, async (req, res) => {
    try {
        const { balance } = req.body;
        const newUser = {};
        if (balance) { newUser.balance = balance; }
        let user = await User.findById(req.params.id);
        user = await User.findByIdAndUpdate(req.params.id,{$set:{balance:balance}},{new : true});
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal server error");
    }
})
module.exports = router;
