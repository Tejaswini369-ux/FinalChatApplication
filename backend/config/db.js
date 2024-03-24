const mongoose = require("mongoose");
const colors = require('colors');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://tejaswini:tejaswini@cluster0.drfriin.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
        });
        console.log(`MONGODB connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(`Error : ${error.message}`.red.bold);
        process.exit(1);
    }
};

module.exports = connectDB;
