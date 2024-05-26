const mongoose = require('mongoose');
const chalk = require('chalk');
const connectDB = () => {

    const url = "mongodb://localhost:27017/Parking"

    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    mongoose.connection.once("open", async () => {
        console.log(chalk.blue('Database Connected'));
    });
      
    mongoose.connection.on("error", (err) => {
        console.log(chalk.red('Database Not Connected' + err));
    });
}

module.exports = {
    connectDB
}