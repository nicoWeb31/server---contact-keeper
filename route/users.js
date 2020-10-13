const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')

const { validationResult, check } = require('express-validator');


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
],async (req,res)=>{
    //si errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() })
    }

    //sinon on envoie en bdd
    const { name, email, password} = req.body;

    try{
        let user = await User.findOne({email});
        //si user exist deja
        if(user){
            res.status(400).json({message : "user already exists"})
        }

        user = new User({name,email,password})

        //hpassword genSalt et hash retourne une promesse
        const salt = await bcrypt.genSalt(10)
        
        user.password = await bcrypt.hash(password, salt)

        await user.save();

        //jwt 
        //info passed in token
        const payload = {

            user: {
                id:user.id
            }
        }
        jwt.sign(payload,config.get('jwtSecret'),{
            expiresIn: 36000
        },(err,token)=>{
            if(err) throw err;
            //ont retourne le token
            res.json({ token })
        })


    }catch(err){
        console.error(err.message)
        res.status(500).send('server error !')
    }

    // res.send('ok passed')
})

module.exports = router;