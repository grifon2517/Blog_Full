require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");

const routes = require("./routes");

const port = 3000;

const app = express();

app.use(express.static(path.resolve(__dirname, "../frontend/dist")));


app.use(cookieParser());
app.use(express.json());


app.use("/api", routes);


app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});
