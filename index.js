import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

const port = 3000;
const app = express();
const API_URL = "https://v2.jokeapi.dev";

app.use(express.static("pubilc"));
app.use(bodyParser.urlencoded({extended: false}));


app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.listen(port, ()=>{
    console.log("Server running on port: " + port)
});