const express = require('express');
const router = express.Router();
const Transactions = require('../models/Transactions');
const fetchuser = require('../middleware/fecthuser');
const { body, validationResult } = require('express-validator');


// route1 : fetch all transaction  get login required

router.get('/fetchalltransactions', fetchuser, async (req, res) => {
    const transactions = await Transactions.find({ user: req.user.id });
    res.json(transactions);
})

// route2 : make transaction  get login required
router.post('/maketransaction', fetchuser, [
    body('name', 'Enter a valid name').isLength({min:3}),
    body('account', 'Enter a valid account number').isLength({max:15}),
    body('bank', 'Enter a valid name of bank').isLength({min:5}),
    body('branch', 'Enter a valid name of branch').isLength({min:5}),
    body('amount', 'Enter a valid value of money').notEmpty(),

],
    async (req, res) => {
        try{
            const{name , account ,bank ,branch , amount} = req.body;
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({ errors: errors.array() });
            }

            const transaction = new Transactions({
                name , account ,bank ,branch, amount , user : req.user.id
            })

            const savedTransaction = await transaction.save();
            res.json(savedTransaction);
        }catch(err){
            console.error(err.message);
            res.status(500).send("Internal server error");    
        }
    })
module.exports = router;