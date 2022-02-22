const mongoose = require('mongoose')

const NotesSchema = new mongoose.Schema({
    title:  {
        type:String,
        require:true
    }, 
    description: {
        type:String,
        require:true,
        unique:true
    }, 
    tag:{
        type:String,
        default:"general"
    }, 
    date: { type: Date,
            default: Date.now },
    // meta: {
    //   votes: Number,
    //   favs:  Number
    // }
  });


module.exports = mongoose.model('notes',NotesSchema)

