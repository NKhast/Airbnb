const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const session = require('express-session');

//load the environment variable file
require('dotenv').config({ path: "./config/keys.env" });


//import your router objects
const userRoutes = require("./controllers/user");
const roomRoutes = require("./controllers/room");
const generalRoutes = require("./controllers/general");

//creation of app object
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//express static middleware 
app.use(express.static("public"));

//Hanldebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');




/*
    This is to allow specific forms and/or links that were submitted/pressed
    to send PUT and DELETE request respectively!!!!!!!
*/

//custom middleware functions
app.use((req,res,next)=>{

    if(req.query.method=="PUT")
    {
        req.method="PUT"
    }

    else if(req.query.method=="DELETE")
    {
        req.method="DELETE"
    }

    next();
})

app.use(fileUpload());


app.use(session({secret: `${process.env.SESSION_SECRET}` , resave: false,saveUninitialized: true}))

  
//custom middleware functions
app.use((req,res,next)=>{

    //res.locals.user is a global handlebars variable. This means that ever single handlebars file can access 
    //that user variable
    res.locals.user = req.session.user;
    next();
});




//MAPs EXPRESS TO ALL OUR  ROUTER OBJECTS
app.use("/",generalRoutes);
app.use("/user",userRoutes);
app.use("/room",roomRoutes);
// app.use("/",(req,res)=>{
//     res.render("general/404");
// });




//Mongoose
mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log(`Connected to MongoDB Database.`);
})
.catch(err => console.log(`Error occured when connecting to database ${err}`));


//sets up server
const PORT = process.env.PORT;
app.listen(PORT , ()=>{

    console.log(`Web Server is up and running`);
})
