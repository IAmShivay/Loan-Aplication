const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectDatabase = require("./Config/database");

//Dotenv config

dotenv.config();

process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`shutting down the server due to uncaught exception `);
  server.close(() => {
    process.exit(1);
  });
});

//Connecting to database
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const server = app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`server is working on http://localhost:${process.env.PORT}`);
});

//Unhandeled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`shutting down the server due to unhandeled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
