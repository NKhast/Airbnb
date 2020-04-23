// const express = require('express')
// const router = express.Router();

// //Promotion Model
// const promotionModel = require("../models/promotions");

// //Home
// router.get("/", (req, res) => {

//     res.render("general/home", {
//         title: "Home Page",
//         promotions: promotionModel.getallPromotions()
//     });

// });


// //Contact Us
// router.get("/contact-us", (req, res) => {

//     res.render("general/contactus", {
//         title: "Contact Us Page"
//     });

// });

// //when contact us form is submitted
// //process contact us form for when user submits form
// router.post("/contact-us",(req,res)=>{

//     const {firstName,lastName,email,message} = req.body;

//     const sgMail = require('@sendgrid/mail');
//     sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
//     const msg = {
//     to: `negarkhast@gmail.com`,
//     from: `${email}`,
//     subject: 'Contact Us Form Submit',
//     html: 
//     `Vistor's Full Name ${firstName} ${lastName} <br>
//      Vistor's Email Address ${email} <br>
//      Vistor's message : ${message}<br>
//     `,
//     };

//     //Asynchornous operation (who don't know how long this will take to execute)
//     sgMail.send(msg)
//     .then(()=>{
//         res.redirect("/");
//     })
//     .catch(err=>{
//         console.log(`Error ${err}`);
//     });
// });


// //show login form
// router.get("/login", (req, res) => {

//     res.render("login", {
//         title: "Login Page"
//     });

// });

// //show signup form
// router.get("/signup", (req, res) => {

//     res.render("signup", {
//         title: "Sign Up Page"
//     });

// });


// module.exports = router;

/*********************room ROUTES***************************/
const express = require('express')
const router = express.Router();
const roomModel  = require("../models/room");
const isAuthenticated = require("../middleware/auth");


//Route to direct use to Add room form
router.get("/add",isAuthenticated,(req,res)=>
{
    res.render("room/taskAddForm");
});

//Route to process user's request and data when the user submits the add room form
router.post("/add",isAuthenticated,(req,res)=>
{
        const newUser = {
            title : req.body.title,
            description : req.body.description,
            dueDate : req.body.dueDate,
            priority : req.body.priority
        }

             /*
        Rules for inserting into a MongoDB database USING MONGOOSE is to do the following :
        1. YOu have to create an instance of the model, you must pass data that you want inserted
         in the form of an object(object literal)
        2. From the instance, you call the save method
     */

     const room =  new roomModel(newUser);
     room.save()
     .then(()=>{
         res.redirect("/room/list")
     })
     .catch(err=>console.log(`Error happened when inserting in the database :${err}`));
});

////Route to fetch all rooms
router.get("/list",isAuthenticated,(req,res)=>
{
    //pull from the database , get the results that was returned and then inject that results into
    //the taskDashboard

    roomModel.find()
    .then((rooms)=>{


        //Filter out the information that you want from the array of documents that was returned into
        //a new array

        //Array 300 documents meaning that the array has 300 elements 

  
        const filteredTask =   rooms.map(room=>{

                return {

                    id: room._id,
                    title:room.title,
                    description:room.description,
                    dueDate :room.dueDate,
                    status : room.status,
                    priority : room.priority
                }
        });



        res.render("room/taskDashboard",{
           data : filteredTask
        });

    })
    .catch(err=>console.log(`Error happened when pulling from the database :${err}`));

    
  
});

//Route to direct user to the room profile page
router.get("/description",isAuthenticated,(req,res)=>{

    

})


router.get("/edit/:id",(req,res)=>{

    roomModel.findById(req.params.id)
    .then((room)=>{

        const {_id,title,description,dueDate,priority,status} = room;
        res.render("room/taskEditForm",{
            _id,
            title,
            description,
            dueDate,
            priority,
            status  
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
        priority:req.body.priority
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