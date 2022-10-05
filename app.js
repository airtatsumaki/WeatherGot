import express, { json } from 'express';
// const bodyParser = require("body-parser");
import got from "got";
const app = express();
app.use(json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000, () => console.log("Server is running!"));