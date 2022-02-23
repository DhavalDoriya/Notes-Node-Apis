var mongoose = require('mongoose');

const url1 = "mongodb+srv://nodejs:A91Mwg3pVf8H4eSP@cluster0.y9kfv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const url2 = "mongodb://localhost:27017/test"


const connection = () =>{
    mongoose.connect(url1,()=>{
        console.log("database is connected successfully ");
    })
}
connection()
module.exports = connection;

