const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/route");
const errorHandler = require("./error/errorHandlerMiddleware");
const customErrorHandler = require("./error/customErrorHandler");

const app = express();
const PORT = 6006;

app.use(express.json());
app.use(router);
app.use((err, req, res) => {
  throw new customErrorHandler(err.statusCode, err.statusMessage);
});
// app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on: ${PORT}`));
