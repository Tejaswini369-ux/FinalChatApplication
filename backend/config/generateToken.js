const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id },'Tejaswini', {
    expiresIn: "30d",
  });
};

module.exports = generateToken;