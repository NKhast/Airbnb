const express = require('express')
const router = express.Router();

//Promotion Model
const promotionModel = require("../models/promotions");

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