// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a student schema
var studentSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    matric_no: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    course:{
        type:String,
        required:true
    },
    level:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    }
}, {
    timestamps: true
});

/** the schema is useless so far
 we need to create a model using it
 note, the model will create a collection called 'Students'
 that is plural form of 'Dish'
 **/
var Students = mongoose.model('Student', studentSchema);

// make this available to our Node applications
module.exports = Students;