const jwt = require("jsonwebtoken");

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

module.exports = { sign, verify };
