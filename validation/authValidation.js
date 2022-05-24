const { verify } = require("../utilities/authentication");
const { compress, compressGzip } = require("../utilities/compressRes");

const authenticateUser = (req, res, next) => {
  const authToken = req.headers.authorization.split(" ")[1];

  if (!authToken) {
    const response = {
      success: false,
      message: "You are not authorized",
      data: {},
    };
    compress(response);
    res.status(500).send(response);
    next(err);
  }

  if (verify(authToken)) {
    next();
  } else {
    const response = {
      success: false,
      message: "JWT Token doesnot match",
      data: {},
    };
    compress(response);
    res.status(500).send(response);
  }
};

module.exports = authenticateUser;
