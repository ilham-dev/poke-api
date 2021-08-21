require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const logger = require('./app/config/logger.js');
const cors       = require('cors');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  headers: ['Content-Type', 'Access-Control-Allow-Headers', 'Authorization', 'X-Requested-With'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}

app.use(cors(corsOptions));

//Logger Initial
app.use(morgan('combined', { stream: logger.stream }));

// parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to simple poke application." });
});

require("./app/routes/poke.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
