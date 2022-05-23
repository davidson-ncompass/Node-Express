const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/route");
const errorHandler = require("./error/errorHandler");

const app = express();
const PORT = 6006;

app.use(express.json());
app.use(router);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on: ${PORT}`));
