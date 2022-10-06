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
app.use(express.static("public"));
//instead of using body-parser
app.use(express.urlencoded({extended: true})); 
app.use(express.json());
// __dirname fix for ESM.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req,res) => {
  res.sendFile(__dirname + "/index.html");
});

//must use async keyword when using got() within a function
app.post("/", async (req, res) => {
  // res.send('POST request to homepage');
  console.log(req.body.city);
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + req.body.city + "&appid=" + process.env.APP_ID;
  const data = await got(url).json();
  console.log(data);
  
});

app.listen(3000, () => {
  console.log("Server is running!")
  console.log(process.env.APP_ID);
});

// weather app api call
//https://api.openweathermap.org/data/2.5/weather?q={CITY-NAME}&appid={APP_ID}