const mongoose = require("mongoose");
const DB = process.env.DATABSE;

mongoose.connect(DB).then(() => console.log("connection is successfully done")).catch((error) => console.log("Error: " + error.message));