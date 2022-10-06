//import statements using ESM
// 1) "type": "module", must be added to package.json
// 2) must have node v14 and above installed
// 3) may need to delete npm and npm-cache folders in user/appdata/roaming...
// .. then reinstall global node packages (node, nodemon)

import express, { json } from 'express';
import got from "got";
import path from 'path';
import {fileURLToPath} from 'url';
const app = express();
app.use(express.static("public"));
//instead of using body-parser
app.use(json());
// __dirname fix for ESM.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req,res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000, () => console.log("Server is running!"));