const express = require('express');
const router = express.Router();

const { body, validationResult, check } = require('express-validator');


const User = require('../model/User')


//@route POST api/users
//@desc Register a user
//@access Public

router.post('/',[
    check('name','Please add name !')
    .not()
    .isEmpty(),
    check('email','Please include a valide email!')
    .isEmail(),
    check('password','Please enter a password whith 6 or more caracter')
    .isLength({min:6})
],(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() })
    }

    res.send('ok passed')
})

module.exports = router;