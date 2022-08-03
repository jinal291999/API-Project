//IMPORT REQUIRED MODULES
const express = require("express");
const path = require("path"); //path is a built-in Node module
const axios = require("axios");
const app = express(); //create an Express app and store in app variable
const port = process.env.PORT || 8800; //set up a port number

const dotenv = require("dotenv");
dotenv.config();




var  accessToken;
//SET UP PATHS TO IMPORTANT FILES AND FOLDERS
//set up template engine
app.set("views", path.join(__dirname, "views")); //set Express views to use <app_directory>/views
app.set("view engine", "pug");
//set up path for static files (e.g. CSS and client-side JS)
app.use(express.static(path.join(__dirname, "public")));


//SET UP PAGE ROUTES
app.get("/", (request, res) => {
  res.render("index", { title: "Home" });
  getNews(res);
});

app.get("/category", (request, res) => {
  // response.render("category", { title: "categories Us" });
    getAccessToken(res);
});
app.get("/News", (request, res) => {
  // response.render("category", { title: "categories Us" });
    getNews(res);
});
app.get("/contact", (request, res) => {
  res.render("contact", { title: "categories Us" });
});
app.get("/page-requiring-oauth", (request, res) => {
  if (accessToken !== 'null') {
    getAccessToken(res);
  } else {
    startAuthorizing(res);
  }
});
//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})
/**
 * Function to redirect to the Trakt authorization page (see documentation 
 * for URL) to kickstart the authorization process (OAuth2).
 *
 * @param {Response} res The Response for the page to be used for redirecting.
 */
 

/**
 * Function to request the access token. Stores the access token on success.
 *
 * @param {Response} res The Response for the page to be used for redirecting.
 */
function getNews(res){
  const options1 = {
    method: 'GET',
    url: 'https://daily-dog-news.p.rapidapi.com/news/ap',
    headers: {
      'X-RapidAPI-Key': '90125958b9msh8ce2e716f6abe2ep18542djsn617cededb6d4',
      'X-RapidAPI-Host': 'daily-dog-news.p.rapidapi.com'
    }
  };
  
  axios.request(options1).then(function (response){
    console.log(response.data);
    var NewsDes = response.data;
      res.render("News", {
        title: "Home",
        New: NewsDes
  });
})
  .catch(function (error) {
    console.error(error);
  });
}

function getAccessToken(res) {
  
  const options = {
    method: 'GET',
    url: 'https://dog-breeds2.p.rapidapi.com/dog_breeds',
    headers: {
      'X-RapidAPI-Key': '90125958b9msh8ce2e716f6abe2ep18542djsn617cededb6d4',
      'X-RapidAPI-Host': 'dog-breeds2.p.rapidapi.com'
    }

  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
    var dogsInfo = response.data;
      res.render("category", {
        title: "Home",
        dogs: dogsInfo
       
      });
  })
  .catch(function (error) {
    console.error(error);
  });

}



