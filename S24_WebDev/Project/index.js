import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import { fileURLToPath } from "url";

//get current url path of current directory
const __dirname = dirname(fileURLToPath(import.meta.url));

//establish server information
const app = express();
const port = 3000;

//middleware - bodyParser gives a .body to both req and res
app.use(bodyParser.urlencoded({ extended: true}))

//get for when '/' is accessed
app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/views/index.html");
    res.render(__dirname + "/views/index.html", {})
});

//console logs the 
app.post("/submit", (req, res)=>{
    console.log(req.body);
});
//start server
app.listen(port, ()=>{
    console.log("Server running on port "+port);
});