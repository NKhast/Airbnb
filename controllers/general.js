const express = require('express')
const router = express.Router();
const isLoggedIn = require("../middleware/auth");
const dashBoardLoader = require("../middleware/authorization")

//Promotion Model
const promotionModel = require("../models/promotions");

//Featured Rooms Model
const featuredRoomsModel = require("../models/featuredRooms");

//Home
router.get("/", (req, res) => {

    res.render("general/home", {
        title: "Home Page",
        promotions: promotionModel.getallPromotions()
    });

});


//Contact Us
router.get("/contact-us", (req, res) => {

    res.render("general/contactus", {
        title: "Contact Us Page"
    });

});


// Admin Dashboard
router.get("/admin-dashboard", isLoggedIn, dashBoardLoader, (req, res) => {
    res.render("../views/user/adminDashboard")
})

//Featured Rooms
router.get("/featured-rooms", (req, res) => {

    res.render("rooms/featuredRooms", {
        title: "Featured Rooms Page",
        featuredRooms: featuredRoomsModel.getAllllFeaturedRooms()
    });

});

//when contact us form is submitted
//process contact us form for when user submits form
router.post("/contact-us",(req,res)=>{

    const {firstName,lastName,email,message} = req.body;

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
    const msg = {
    to: `negarkhast@gmail.com`,
    from: `${email}`,
    subject: 'Contact Us Form Submit',
    html: 
    `Vistor's Full Name ${firstName} ${lastName} <br>
     Vistor's Email Address ${email} <br>
     Vistor's message : ${message}<br>
    `,
    };

    //Asynchornous operation (who don't know how long this will take to execute)
    sgMail.send(msg)
    .then(()=>{
        res.redirect("/");
    })
    .catch(err=>{
        console.log(`Error ${err}`);
    });
});


//show login form
router.get("/login", (req, res) => {

    res.render("login", {
        title: "Login Page"
    });

});

//show signup form
router.get("/signup", (req, res) => {

    res.render("signup", {
        title: "Sign Up Page"
    });

});


module.exports = router;
