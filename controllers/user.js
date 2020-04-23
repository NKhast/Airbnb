/*********************USER ROUTES***************************/
const express = require('express')
const router = express.Router();
const userModel = require("../models/user");
const path = require("path");
const bcrypt = require("bcryptjs");
const isAuthenticated = require("../middleware/auth");
const dashBoardLoader = require("../middleware/authorization");


//Route to direct use to Registration form
router.get("/signup",(req,res)=>
{
    res.render("user/signup");
});

//Route to process user's request and data when user submits registration form
router.post("/signup",(req,res)=>
{ 

    const newuser = 
    {
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:req.body.password
    }

    const user = new userModel(newuser);
    user.save()
    .then((user)=>{

        req.files.profilePic.name = `pro_pic_${user._id}${path.parse(req.files.profilePic.name).ext}`;

        req.files.profilePic.mv(`public/uploads/${req.files.profilePic.name}`)
        .then(()=>{


            userModel.updateOne({_id:user._id},{
                profilePic: req.files.profilePic.name
            })
            .then(()=>{
                res.redirect(`/user/login`)
            })

        })
      
      
       
    })
    .catch(err=>console.log(`Error while inserting into the data ${err}`));
 
});

//Route to direct user to the login form
router.get("/login",(req,res)=>
{
    res.render("user/login");
});

//Route to process user's request and data when user submits login form
router.post("/login",(req,res)=>
{

    userModel.findOne({email:req.body.email})
    .then((user)=>{

        const errors= [];

        //there was no matching email
        if(user==null)
        {
            errors.push("Sorry, your email and/or password incorrect")

            res.render("user/login",{
                errors
            })
        }

        //There is a matching email
        else
        {
            bcrypt.compare(req.body.password,user.password)
            .then((isMatched)=>{

                //password match
                if(isMatched)
                {
                   req.session.userInfo= user;

                   res.redirect("/user/profile")
                }

                //no match
                else
                {
                    errors.push("Sorry, your email and/or password incorrect!")

                    res.render("user/login",{
                      errors
                    })
                }

            })
            .catch(err=>console.log(`Error ${err}`));

        }


    })
    .catch(err=>console.log(`Error ${err}`));

});



router.get("/profile",isAuthenticated,dashBoardLoader);


router.get("/logout",(req,res)=>{

    req.session.destroy();
    res.redirect("/user/login")
});



module.exports=router;