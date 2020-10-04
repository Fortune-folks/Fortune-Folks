const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");

//Setting the encodings for post requests
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: false })); // to support URL-encoded bodies

// setting the public static folder
app.use(express.static("public"));

// Setting up the view engine
app.set("view engine", "ejs");

////////////////////////////////////////////
//Connecting to the MongoDB Altas Database//
////////////////////////////////////////////
const connURL =
	"mongodb+srv://" +
	process.env.DB_USER +
	":" +
	process.env.DB_PWD +
	"@cluster0-avdpm.mongodb.net/" +
	process.env.DB_NAME +
	"?retryWrites=true&w=majority";
mongoose.connect(connURL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

const con = mongoose.connection;
con.on("open", () => {
	console.log("Connected To Database");
});

///////////////////////////////////////////////

//Setting up routes
const routes = require("./routes/routes.js");
app.use("/", routes);

//Making the server to listen to a port
app.listen(process.env.PORT || 9000, () => {
	console.log("SERVER STARTED.....");
});