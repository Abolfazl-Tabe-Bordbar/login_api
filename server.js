const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

const path = require('path');
const cookieParser = require("cookie-parser");
app.use(cookieParser());


// ----------------------------------------------------------
const cors = require("./modules/middlewares/cors/index.js");
app.use(cors);
// ----------------------------------------------------------


// ----------------------------------------------------------
const users_route = require("./modules/routes/users");
const admins_route = require("./modules/routes/admins");


app.use("/users",users_route);
app.use("/admins",admins_route);


// ----------------------------------------------------------


app.use((req,res) => {
    res.json({
        status : false,
        message : "This route is not in my api"
    });
});



app.listen(4300);