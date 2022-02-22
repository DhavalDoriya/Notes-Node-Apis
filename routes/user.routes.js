const express = require('express');
const router = express.Router()
const { body, validationResult } = require('express-validator');
// const User = require('../models/User');
const user = require('../models/User')

//create new user with validtion and check exiesting user
router.post('/', [
    body('name', 'Enter A Name Atlest 5 charecter').isLength({ min: 5 }),
    body('email', 'Enter A valid email').isEmail(),
    body('password', 'Enter A Password Atlest 5 charecter').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let checkuser = await user.findOne({email:req.body.email})
    if (checkuser) {
        return res.status(400).json({ massage : "email already registered" });
        
    }
    User = new user({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    try {
        const Users = await User.save();
        res.status(201).send(Users)
    } catch (error) {
        res.status(404).send(error.massage)
    }
})

//get all user
router.get('/', async (req, res) => { 
    let checkuser = await user.find()
    res.send(checkuser)
    
})

router.delete('/:id', async (req, res) => {
  
    
    let checkuser = await user.findByIdAndDelete({_id:req.params.id})
    if (checkuser) {
        return res.status(201).json({ massage : "deleted" });
        
    }
})



module.exports = router