const express = require('express');
const router = express.Router()
const { body, validationResult } = require('express-validator');
const user = require('../models/User')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = "jbdksvjnasclncsn"
const auth = require('../middleware/jwt')


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
    let checkuser = await user.findOne({ email: req.body.email })
    if (checkuser) {
        return res.status(400).json({ massage: "email already registered" });
    }
    const salt = await bcrypt.genSalt(10)
    const spass = await bcrypt.hash(req.body.password, salt)
    User = new user({
        name: req.body.name,
        email: req.body.email,
        password: spass
    })

    const data = {
        user: {
            id: user.id
        }
    }
    const authtoken = jwt.sign(data, JWT_SECRET)
    res.json({ authtoken })
    try {
        const Users = await User.save();
        res.status(201).send(Users)
    } catch (error) {
        res.status(404).send(error.massage)
    }
})
//login user
router.post('/login', [
    body('email', 'Enter A valid email').isEmail(),
    body('password', 'Enter A Password Atlest 5 charecter').exists()
], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;
    try {
        let tempuser = await user.findOne({ email })
        if (tempuser) {
            const cpass = await bcrypt.compare(password, tempuser.password)
            if (cpass) {
                const data = {
                    user: {
                        id: user.id
                    }
                }
                const authtoken = jwt.sign(data, JWT_SECRET)
                return res.status(200).json({ authtoken })

            } else {
                return res.status(400).json({ massage: "invalid details" });
            }
        } else {
            return res.status(400).json({ massage: "invalid details" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }

})

//serach user
router.get('/search/:key', async (req, res) => {
    let data = await user.find(
        {
            "$or": [
                { name: { $regex: req.params.key } }
                // ,{ category: { $regex: req.params.key } }

            ]
        });
    res.send(data);
})

//get all user
router.get('/', async (req, res) => {
    let checkuser = await user.find().select("-password")
    res.send(checkuser)

})

//get user by id
router.get('/:id', async (req, res) => {
    let checkuser = await user.findById({ _id: req.params.id })
    if (checkuser) {
        return res.status(201).json({ checkuser });

    } else {
        return res.status(404).json({ "user": "user not found" });
    }
})

//delete user by ID
router.delete('/:id',auth, async (req, res) => {
    let checkuser = await user.findByIdAndDelete({ _id: req.params.id })

    try {
        if (checkuser) {
            return res.status(201).json({ massage: "deleted" });
        }else{
            return res.status(400).json({error: "error"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
        
    }
   
})

//get user jwt by id
router.post('/jwt', auth, async (req, res) => {
    try {
        userid = req.user.id;
        let checkuser = await user.find(userid).select("-password")
        res.status(200).json(checkuser)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)

    }
})


// const lion = require('lion-lib-007')
// sandip ka package
// router.get('/test',  (req, res) => {
//     const a  =lion.add(15315,5)
//     console.log(a);
//     res.status(200).send(`${a}`)
// })

module.exports = router