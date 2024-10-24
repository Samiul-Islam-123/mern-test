const mongoose = require('mongoose')

const ConnectToDatabase = (async url => {
    try{
        console.log("Connecting to MongoDB...");
    await mongoose.connect(url);
    console.log("Connected to MongoDB successfully");
    }
    catch(error){
        throw(error);
    }
})

module.exports = ConnectToDatabase