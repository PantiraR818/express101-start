require('dotenv').config({ path: './config.env'});    //import
const express = require('express');   //ไลบรารี่จำเป็น
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 4002;

const productRoute = require("./routes/productRoute");   //import route
const employeeRoute = require("./routes/employeeRoute");
const req = require('express/lib/request');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
require("./db")(app);
app.use("/product", productRoute);
app.use("/employee", employeeRoute);

// Routing Table
app.get("/",(req, res)=>{
    res.send("Hello from index");
});

app.get("/login",(req, res)=>{
    res.send("Hello from login");
});

app.post("/register",(req, res)=>{
    console.log(req.body.name);
    console.log(req.body.email);
    res.send("Hello from register");
});


app.listen(port, ()=>{
    console.log(`App is running on port ${port}`);
});

