const express = require('express');
const router = express.Router();
const auth= require('../middleware/auth')

const { validationResult, check } = require('express-validator');


const User = require('../model/User');
const Contact = require('../model/Contact');



//@route GET api/contacts
//@desc Get all user contacts
//@access Private

router.get('/',auth,async(req,res)=>{
    try {
        const contacts = await Contact.find({user : req.user.id}).sort({date: -1});
        res.json(contacts)
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error ! ')
    }
})

//@route POST api/contact
//@desc Add new contacts
//@access Private

router.post('/',[auth,[
    check('name','Name is required')
    .not()
    .isEmpty()
]],async(req,res)=>{
    //si errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() })
    }

    const {name, email,phone, type} = req.body;

    try{
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        });

        const contact = await newContact.save();

        res.json(contact);

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Errors');
    }
})


//@route Put api/contact/:id
//@desc Update contact
//@access Private

router.put('/:id',auth,(req,res)=>{
    res.send('update contact id');
})

//@route Delete api/contact/:id
//@desc delete contact
//@access Private

router.delete('/:id',auth,(req,res)=>{
    res.send('delete contact id');
})

module.exports = router;