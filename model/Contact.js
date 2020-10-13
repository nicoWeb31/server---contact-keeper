const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    user:{
        //ref a l'utilisateur
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    type:{
        type: String,
        default: 'personal'
    },
    date: {
        type: Date,
        default: Date.now

    }
})

module.exports = mongoose.model('contact',ContactSchema)