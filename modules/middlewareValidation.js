const { verify } = require("../utilities/authentication");
const compress = require("../utilities/compressRes");

const authenticateUser = (err, req, res, next) => {
  studentDetails = req.query;

  if (!studentDetails.userId) {
    const response = {
      success: false,
      message: "Please provide userId",
      data: {},
    };
    compress(response);
    res.status(500).send(response);
    next(err);
    return;
  }

  if (verify(studentDetails.userId)) {
    next();
  } else {
    const response = {
      success: false,
      message: "JWT Token doesnot match",
      data: {},
    };
    compress(response);
    res.status(500).send(response);
    next(err);
    return;
  }
};

module.exports = authenticateUser;
