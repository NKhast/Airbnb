// const room = 
// {

//     fakeDB : [],

//     init()
//     {
//         this.fakeDB.push({title:'XPS 13',description:`Our smallest 13-inch laptops feature a virtually 
//         borderless InfinityEdge display and up to 10th gen Intel® processors. 
//         Touch, silver, rose gold and frost options available`,price:`1349.99`});
    
//          this. fakeDB.push({title:'XPS 15',description:`Powerhouse performance with the latest processors and NVIDIA 
//         graphics paired with a stunning 4K Ultra HD display. `,price:`1749.99`});
    
//         this.fakeDB.push({title:'XPS 17',description:`XPS 17 is designed to keep you entertained for more than 9 hours 
//         with a 9-cell battery upgrade.`,price:`1949.99`});

//         this.fakeDB.push({title:'XPS 19',description:`XPS 19 is designed to keep you entertained for more than 11 hours 
//         with a 10-cell battery upgrade.`,price:`2149.99`});

//     },
//     getAllRooms()
//     {
//         return this.fakeDB;
//     }


// }

// room.init();
// module.exports=room;

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
    priority :
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
    }
  });

  /*
    For every Schema you create(Create a schema per collection), you must also create a model object. 
    The model will allow you to perform CRUD operations on a given collection!!! 
  */

 const roomModel = mongoose.model('room', roomSchema);

 module.exports = roomModel;