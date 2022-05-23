const jwt = require("jsonwebtoken");
const compress = require("./compressRes");

const privateKey = "unlockJson";

let token;

const sign = (id) => {
  token = jwt.sign(id, privateKey);
  return token;
};

const verify = (id) => {
  const decoded = jwt.verify(token, privateKey);
  if (id === decoded) {
    return true;
  } else {
    return false;
  }
};

const authenticate = (req, res, next) => {
  data = req.query;

  const decoded = jwt.verify(token, privateKey);
  if (data.id === decoded) {
    const response = {
      success: false,
      message: "JWT Token matched",
      data: {
        id_provided: data.id,
      },
    };
    compress(response);
    res.status(200).send(response);
    next();
  } else {
    const response = {
      success: false,
      message: "JWT Token not matched",
      data: {
        id_provided: data.id,
      },
    };
    compress(response);
    res.status(400).send(response);
  }
};

module.exports = { sign, verify, authenticate };
