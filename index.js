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
  res.render("GetJokes.ejs", { joke: null, setup: null, delivery: null });
});

app.get("/postJoke", (req, res) => {
  res.render("PostJokes.ejs");
});

app.post("/customJoke", async (req, res) => {
  try {
    const category = [req.body.category];
    var randomCategory = category[Math.floor(Math.random() * category.length)];
    const path = "/joke/" + randomCategory;
    const config = {
      params: {
        lang: req.body.languaje,
        blackListFlags: [req.body.flank],
        type: req.body.jokeType,
      },
    };
    const response = await axios.get(API_URL + path, config);
    const result = response.data;

    res.render("GetJokes.ejs", {
      category: JSON.stringify(result.category),
      type: JSON.stringify(result.type),
      joke: JSON.stringify(result.joke),
      setup: JSON.stringify(result.setup),
      delivery: JSON.stringify(result.delivery),
      nsfw: JSON.stringify(result.flags.nsfw),
      religious: JSON.stringify(result.flags.religious),
      political: JSON.stringify(result.flags.political),
      racist: JSON.stringify(result.flags.racist),
      sexist: JSON.stringify(result.flags.sexist),
      explicit: JSON.stringify(result.flags.explicit),
    });
  } catch (error) {
    res.render("GetJokes.ejs", {
      joke: error.message,
      category: null,
      type: null,
      setup: null,
      delivery: null,
      nsfw: null,
      religious: null,
      political: null,
      racist: null,
      sexist: null,
      explicit: null,
    });
  }
});
app.listen(port, () => {
  console.log("Server running on port: " + port);
});
