const mongoose = require("mongoose");
const { STATUSCODE } = require("../constants/index");

const dbConnect = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error}`);
        const mongoExit = STATUSCODE.ONE;
        process.exit(mongoExit);
    }
};

module.exports = dbConnect;