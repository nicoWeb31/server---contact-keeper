const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')

const { validationResult, check } = require('express-validator');


const User = require('../model/User')


//@route GET api/auth
//@desc Get logged in user
//@access Private

router.get('/',(req,res)=>{
    res.send('get loggded user');
})

//@route POST api/auth
//@desc Auth user and get token
//@access Public

router.post('/',[
    check('email','Please enter a valide email')
    .isEmail(),
    check('password', 'Password is required')
    .exists()
],async(req,res)=>{
    //si errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() })
    }

    const {email, password} = req.body;

    try{

        //on essaie de recuperer le user
        let user = await User.findOne({email});
        if(!user){

            return res.status(400).json({message: 'Invalid Credentials'});
        } 

        //on test si les pass match
        const  isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            
            return res.status(400).json({message: 'Invalid credentials'})
        } 

        //si c'est ok
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
        console.error(err.message);
        res.status(500).send('server error ...')
    }

})

module.exports = router;