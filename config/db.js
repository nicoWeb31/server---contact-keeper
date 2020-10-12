const mongoose = require('mongoose');

const config = require('config');
const db = config.get('mongoURI');

const connectdb = async() =>{

    try{
        mongoose.connect(db,{
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true 
        });

        console.log('Mdb connect !!....')
    }catch(err){
        console.error(err.message)
        process.exit(1)

    }


    mongoose.connect(db,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true 
    })

}
module.exports = connectdb;