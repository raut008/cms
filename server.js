const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { connectDB } = require("./config/db");

// Route files
const bootcamps = require("./routes/bootcamps");

dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

//Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Mount routers
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server is running ${process.env.NODE_ENV} mode on port ${PORT}`)
);

//handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);

  server.close(() => process.exit(1));
});
