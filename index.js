import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

const port = 3000;
const app = express();
const API_URL = "https://v2.jokeapi.dev";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  try {
    const path = "/joke/any";
    const response = await axios.get(API_URL + path);
    const resultJoke = response.data;
    res.render("index.ejs", {
      joke: JSON.stringify(resultJoke.joke),
      setup: JSON.stringify(resultJoke.setup),
      delivery: JSON.stringify(resultJoke.delivery),
    });
  } catch (error) {
    res.render("index.ejs", { joke: "this joke doesnt exist!" });
  }
});

app.get("/getJoke", (req, res) => {
  res.render("GetJokes.ejs");
});

app.get("/postJoke", (req, res) => {
  res.render("PostJokes.ejs");
});

app.post("/customJoke", (req, res) => {
    try{
        if(req.body.radio == "Custom"){
            const programming = req.body.Programming;
            const misc = req.body.Misc;
            const dark = req.body.Dark;
            
        }
        const config = {
            params: {
                category: 
            }
        }
        const path = "/joke"

    }catch(error){

    }
});
app.listen(port, () => {
  console.log("Server running on port: " + port);
});
