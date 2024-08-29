const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {
      dbName: "LoanApplication", // Replace 'yourDatabaseName' with the actual name of your database
    })
    .then((data) => {
      console.log(`MongoDb connected with server ${data.connection.host}`);
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

module.exports = connectDatabase;
