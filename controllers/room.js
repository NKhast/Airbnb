// const express = require('express')
// const router = express.Router();

//Load roomModel
// const roomModel = require("../models/room");

//Routes

//show all rooms
// router.get("/list",(req,res)=>{

//     res.render("rooms/roomList",{
//     title:"Room Listing Page",
//     rooms : roomModel.getAllRooms()
// });

// });

//Show add room form
// router.get("/add",(req,res)=>{

// res.render("rooms/roomAdd",{
//     title:"Add Room Page"
// });

// });

// //When the form is submitted
// router.post("/add",(req,res)=>{

// //res.render();
// });


// module.exports = router;

/*********************room ROUTES***************************/
const express = require('express')
const router = express.Router();
const roomModel  = require("../models/room");
const path = require("path");


//Route to direct use to Add room form
router.get("/add",(req,res)=>
{
    res.render("rooms/roomAdd");
});

//Featured Rooms
router.get("/featured-rooms",(req,res)=>
{
    //pull from the database , get the results that was returned and then inject that results into
    //the roomDashboard

    roomModel.find({ featuredRoom: "Yes" })
    .then((rooms)=>{


        //Filter out the information that you want from the array of documents that was returned into
        //a new array

        //Array 300 documents meaning that the array has 300 elements 

  
        const featuredRoom =   rooms.map(room=>{

                return {

                    id: room._id,
                    title:room.title,
                    description:room.description,
                    dueDate :room.dueDate,
                    status : room.status,
                    featuredRoom : room.featuredRoom,
                    roomPic : room.roomPic,
                    price : room.price
                }
        });



        res.render("rooms/featuredRooms",{
           data : featuredRoom
        });

    })
    .catch(err=>console.log(`Error happened when pulling from the database :${err}`));

    
  
});

//Route to process user's request and data when the user submits the add room form
router.post("/add",(req,res)=>
{ 
        const newRoom = {
            title : req.body.title,
            description : req.body.description,
            dueDate : req.body.dueDate,
            featuredRoom : req.body.featuredRoom,
            price : req.body.price
        }

             /*
        Rules for inserting into a MongoDB database USING MONGOOSE is to do the following :
        1. YOu have to create an instance of the model, you must pass data that you want inserted
         in the form of an object(object literal)
        2. From the instance, you call the save method

     */


     const room =  new roomModel(newRoom);
     room.save()
    .then((room)=>{
        
        req.files.roomPic.name = `room_pic_${room._id}${path.parse(req.files.roomPic.name).ext}`;

        req.files.roomPic.mv(`public/uploads/${req.files.roomPic.name}`)
        .then(()=>{


            roomModel.updateOne({_id:room._id},{
                roomPic: req.files.roomPic.name
            })
            .then(()=>{
                res.redirect(`/room/list`)
            })

        }) 
     })
     .catch(err=>console.log(`Error happened when inserting in the database :${err}`));
});

////Route to fetch all rooms
router.get("/list",(req,res)=>
{
    //pull from the database , get the results that was returned and then inject that results into
    //the roomDashboard

    roomModel.find()
    .then((rooms)=>{


        //Filter out the information that you want from the array of documents that was returned into
        //a new array

        //Array 300 documents meaning that the array has 300 elements 

  
        const filteredRoom =   rooms.map(room=>{

                return {

                    id: room._id,
                    title:room.title,
                    description:room.description,
                    dueDate :room.dueDate,
                    status : room.status,
                    featuredRoom : room.featuredRoom,
                    roomPic : room.roomPic,
                    price : room.price
                }
        });



        res.render("rooms/roomList",{
           data : filteredRoom
        });

        // res.render("rooms/roomDashboard",{
        //     data : filteredRoom
        //  });

    })
    .catch(err=>console.log(`Error happened when pulling from the database :${err}`));

    
  
});

router.get("/dashboard",(req,res)=>
{

    roomModel.find()
    .then((rooms)=>{

  
        const filteredRoom =   rooms.map(room=>{

                return {

                    id: room._id,
                    title:room.title,
                    description:room.description,
                    dueDate :room.dueDate,
                    status : room.status,
                    featuredRoom : room.featuredRoom
                }
        });



        res.render("rooms/roomDashboard",{
           data : filteredRoom
        });

    })
    .catch(err=>console.log(`Error happened when pulling from the database :${err}`));

    
  
});


//Route to direct user to the room profile page

router.get("/profile/:id",(req,res)=>{

    roomModel.findById(req.params.id)
    .then((room)=>{

        const {_id,title,description,dueDate,featuredRoom,roomPic,status,price} = room;
        res.render("rooms/roomProfile",{
            _id,
            title,
            description,
            dueDate,
            featuredRoom,
            roomPic,
            status,
            price
        })

    })
    .catch(err=>console.log(`Error happened when pulling from the database :${err}`));


})


router.get("/edit/:id",(req,res)=>{

    roomModel.findById(req.params.id)
    .then((room)=>{

        const {_id,title,description,dueDate,featuredRoom,status,price} = room;
        res.render("rooms/roomEdit",{
            _id,
            title,
            description,
            dueDate,
            featuredRoom,
            status,
            price
        })

    })
    .catch(err=>console.log(`Error happened when pulling from the database :${err}`));


})



router.put("/update/:id",(req,res)=>{

    const room =
    {
        title:req.body.title,
        description:req.body.description,
        dueDate:req.body.dueDate,
        status:req.body.status,
        featuredRoom:req.body.featuredRoom,
        price:req.body.price
    }

    roomModel.updateOne({_id:req.params.id},room)
    .then(()=>{
        res.redirect("/room/list");
    })
    .catch(err=>console.log(`Error happened when updating data from the database :${err}`));


});


router.delete("/delete/:id",(req,res)=>{
    
    roomModel.deleteOne({_id:req.params.id})
    .then(()=>{
        res.redirect("/room/list");
    })
    .catch(err=>console.log(`Error happened when updating data from the database :${err}`));

});





//Route to direct user to edit room form



//Route to update user data after they submit the form


//router to delete user


module.exports=router;