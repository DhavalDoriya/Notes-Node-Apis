const express = require('express')
const app = express()
require("./conn")
var bodyParser = require('body-parser')
app.set("view engine", "ejs");
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); 

const appPort = 3000 || process.env.PORT;


app.use('/api/notes',require('./routes/notes.routes.js'))
app.use('/api/user',require('./routes/user.routes.js'))


app.listen(appPort, () => {
    console.log(`server running on  http://127.0.0.1:${appPort}`);
  });


