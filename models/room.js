const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//This indicates the shape of the documents that will be entering the database
  const roomSchema = new Schema({
   
    title:
    {
      type:String,
      required:true
    },

    description: 
    {
        type:String,
        required:true
    },
    dueDate :
    {
        type:Date,
        required:true
    },
    featuredRoom :
    {
        type:String,
        required:true
    },
    roomPic:
    {
        type:String
    },

    status:
    {
        type:String,
        default:"Open"
    },
    dateCreated:
    {
        type:Date,
        default:Date.now()
    },
    price:
    {
      type:Number
    }

  });

  /*
    For every Schema you create(Create a schema per collection), you must also create a model object. 
    The model will allow you to perform CRUD operations on a given collection!!! 
  */

 const roomModel = mongoose.model('room', roomSchema);

 module.exports = roomModel;