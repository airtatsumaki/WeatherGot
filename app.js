//import statements using ESM
// 1) "type": "module", must be added to package.json
// 2) must have node v14 and above installed
// 3) may need to delete npm and npm-cache folders in user/appdata/roaming...
// .. then reinstall global node packages (node, nodemon)

import express from 'express';
import got from "got";
import path from 'path';
import * as http from 'http';
import {fileURLToPath} from 'url';
import * as dotenv from 'dotenv';
dotenv.config();
const app = express();
// app.use(express.static("public"));
// instead of using body-parser
app.use(express.urlencoded({extended: true})); 
app.use(express.json());
// __dirname fix for ESM.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req,res) => {
  res.sendFile(__dirname + "/index.html");
});

//must use async keyword when using await within a function
app.post("/", async (req, res) => {
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + req.body.city + "&appid=" + process.env.APP_ID + "&units=metric";
  try {
    const data = await got(url).json();
    //needed for cities with special characters.
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write("<h1>The current weather condition in " + String(data.name) + " is " + parseInt(data.main.temp) + "<sup>o</sup>, " + String(data.weather[0].description).toLowerCase() + "</h1>");
    res.write("<img src='http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png' style='width: 200px;'/>");
    res.send();
  }
  catch(error){
    res.write("OPPS! Something went wrong. Error code: " + error.response.statusCode + ". Try again.");
    res.send();
  }
});

app.listen(3000, () => {
  console.log("Server is running!")
  //console.log(process.env.APP_ID);
});

// weather app api call
//https://api.openweathermap.org/data/2.5/weather?q={CITY-NAME}&appid={APP_ID}&units=metric