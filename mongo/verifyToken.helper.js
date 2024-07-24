const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  console.log("start decoding");

  const decoded = jwt.verify(token, process.env.SECRET);
  console.log("decoded");
  if (!decoded) {
    throw Error("token not valid");
  }
  return decoded;
};
module.exports = verifyToken;
