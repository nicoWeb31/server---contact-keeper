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

router.put('/:id',auth,async(req,res)=>{
    const {name, email,phone, type} = req.body;

    //build contact object
    const contactField = {};

    if(name) contactField.name = name;
    if(email) contactField.email = email;
    if(phone) contactField.phone = phone;
    if(type) contactField.name = type;

    try{

        let contact = await Contact.findById(req.params.id);

        if(!contact) return res.status(404).json({message:'Contact not found'})

        //Make sure user owns contact
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg : 'Not authorized'})
        }

        contact = await Contact.findByIdAndUpdate(req.params.id,
            {$set:contactField},
            {new:true});

        res.json(contact)    

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Errors');
    }

})

//@route Delete api/contact/:id
//@desc delete contact
//@access Private

router.delete('/:id',auth,async (req,res)=>{
    try{

        let contact = await Contact.findById(req.params.id);

        if(!contact) return res.status(404).json({message:'Contact not found'})

        //Make sure user owns contact
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg : 'Not authorized'})
        }

        await Contact.findByIdAndRemove(req.params.id)
        res.json({message:'Contact removed'})    

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Errors');
    }
})

module.exports = router;