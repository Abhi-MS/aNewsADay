require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = 3000;
const d = new Date();
const date = d.toISOString().slice(0,10);
// const date = d.slice(0, 10);
console.log(date);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://newsapi.org/v2/everything?q=Apple&from=2023-08-10&sortBy=popularity&apiKey="+process.env.API_KEY);
    const result = response.data;
    const randomNumber = Math.floor(Math.random()*result.articles.length);
    console.log(result.articles[randomNumber]);
    const news = {
      title : result.articles[randomNumber].title,
      author : result.articles[randomNumber].author,
      article : result.articles[randomNumber].description,
      url : result.articles[randomNumber].url
    };
    res.render("index.ejs", { data: news });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});
app.get("/yesterday", async (req, res) => {
  try {
    const response = await axios.get("https://newsapi.org/v2/everything?q=Apple&from=2023-08-03&sortBy=popularity&apiKey=6185b60914b44c2e9e4f5b9b3a579666");
    const result = response.data;
    const randomNumber = Math.floor(Math.random()*result.articles.length);
    console.log(result.articles[randomNumber]);
    const news = {
      title : result.articles[randomNumber].title,
      author : result.articles[randomNumber].author,
      article : result.articles[randomNumber].description,
      url : result.articles[randomNumber].url,
      urlToImage : result.articles[randomNumber].urlToImage
    };
    res.render("index.ejs", { data: news });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});
// app.post("/", async (req, res) => {
  
//   try{
//     const response=await axios.get(
//       `https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`
//     );
//     const result= response.data;
//     const randomNumber = Math.floor(Math.random*result.length);
//   }catch (error) {
//     console.error("Failed to make request:", error.message);
//     res.render("index.ejs", {
//       error: "No activities matching your criteria",
//     });
//   }



//   // Step 2: Play around with the drop downs and see what gets logged.
//   // Use axios to make an API request to the /filter endpoint. Making
//   // sure you're passing both the type and participants queries.
//   // Render the index.ejs file with a single *random* activity that comes back
//   // from the API request.
//   // Step 3: If you get a 404 error (resource not found) from the API request.
//   // Pass an error to the index.ejs to tell the user:
//   // "No activities that match your criteria."
// });

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
