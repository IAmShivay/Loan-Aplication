const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {
    })
    .then((data) => {
      console.log(`MongoDb connected with server ${data.connection.host}`);
    })
};

module.exports = connectDatabase;