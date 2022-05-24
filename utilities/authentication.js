const jwt = require("jsonwebtoken");
require("dotenv").config();

const privateKey = process.env.SECRETKEY;
let token;
const sign = (id) => {
  token = jwt.sign({ id: id }, privateKey, { expiresIn: 90000 });
  return token;
};

const verify = (userToken) => {
  const decoded = jwt.verify(token, privateKey);
  const userTokenDecoded = jwt.verify(userToken, privateKey);
  if (decoded.id === userTokenDecoded.id) {
    return true;
  } else {
    return false;
  }
};

module.exports = { sign, verify };
