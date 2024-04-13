const app = require("./app")
const dbConnect = require("./config/database")
const mongoose = require("mongoose")
require("dotenv").config({path: "./config/.env"})
const PORT = process.env.PORT || 4000;

dbConnect();
mongoose.connection.once("open", () => {
    app.listen(PORT)
    console.log(`Connected to MongoDB on ${mongoose.connection.host}: ${PORT}`)
})

mongoose.connection.on("error", (error) =>
{
    console.log(`Error: ${error.no}: ${error.code}\t${error.syscall}\t${error.hostname}`)
})