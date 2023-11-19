const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const cors = require("cors");

const app = express();

const corsOptions ={
   origin:"http://localhost:8081", 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
};

app.use(cors(corsOptions));

// parse cookies
app.use(cookieParser());
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Connect to MongoDB
*/
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bahta application." });
});


require("./app/routes/truths.routes")(app);
require("./app/routes/auth.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
