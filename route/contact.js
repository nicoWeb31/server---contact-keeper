const express = require('express');
const router = express.Router();


//@route GET api/contact
//@desc Get all user contacts
//@access Private

router.get('/',(req,res)=>{
    res.send('Get all contact');
})

//@route POST api/contact
//@desc Add new contacts
//@access Private

router.post('/',(req,res)=>{
    res.send('add contact');
})


//@route Put api/contact/:id
//@desc Update contact
//@access Private

router.put('/:id',(req,res)=>{
    res.send('update contact id');
})

//@route Delete api/contact/:id
//@desc delete contact
//@access Private

router.delete('/:id',(req,res)=>{
    res.send('delete contact id');
})

module.exports = router;