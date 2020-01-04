const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`listening ${PORT}`);
});
