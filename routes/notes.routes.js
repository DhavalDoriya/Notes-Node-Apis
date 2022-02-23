const express = require('express');
const router = express.Router()
const auth = require('../middleware/jwt');
const Notes = require('../models/Notes');
const user = require('../models/User');
const { body, validationResult } = require('express-validator');


router.get('/allnotes',auth,async (req,res)=>{
    const notes = await Notes.find({user: req.user.id})

    res.json(notes)
   
})

router.post('/note',[
    body('title', 'Enter A title Atlest 3 charecter').isLength({ min: 3 }),
    body('description', 'Enter A description Atlest 5 charecter').isLength({ min: 5 }),
],auth,async (req,res)=>{
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const{title,description,tag} = req.body;

    Notes = new note({
        title,
        description,
        tag,
        user: req.user.id
    })
    newnote = await Notes.save()
    res.send(newnote)
 
   
})


module.exports = router