const mongoose = require('mongoose')

const NotesSchema = new mongoose.Schema({
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:  {
        type:String,
        require:true
    }, 
    description: {
        type:String,
        require:true
        
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

