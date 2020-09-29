const config = require('config');
const mongoose = require('mongoose');
const db = config.get('mongoUri');

const connection = async () =>{
    await mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
    },
    console.log(`Connected to MongoDB`) 
    )
} 
module.exports = connection;