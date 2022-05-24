const express = require("express");
const router = require("./routes/route");
require("dotenv").config();
const errorHandler = require("./error/errorHandlerMiddleware");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(router);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on: ${PORT}`));
