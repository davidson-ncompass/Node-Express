const express = require("express");
const bodyParser = require("body-parser");
const router = require("./Controller/studentController");

const app = express();
const PORT = 6006;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/", router);

app.listen(PORT, () => console.log(`Server running on: ${PORT}`));
