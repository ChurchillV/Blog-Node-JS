const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
   title: {
      type: String,
      required: true
   },
   summary: {
      type: String,
      required: true
   },
   body: {
      type: String,
      required: true
   
   }
}, {timestamps: true} )

const Log = mongoose.model('Log', logSchema);
module.exports = Log; 
