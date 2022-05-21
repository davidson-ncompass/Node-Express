const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/route");

const app = express();
const PORT = 6006;

app.use(router);

app.listen(PORT, () => console.log(`Server running on: ${PORT}`));
