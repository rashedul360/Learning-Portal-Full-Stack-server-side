var jwt = require("jsonwebtoken");

const expireTokenVerification = (req, res, next) => {
 const { token } = req.headers || "";
 const splitToken = token?.split("Bearer")[1];
 jwt.verify(splitToken, "shhhhh", function (err) {
  if (err) {
   console.log(`erorr on expire token verify ${err}`);
   return res.status(401).json({ message: "token expired", status: 401 });
  }
  return next(err);
 });
};
module.exports = expireTokenVerification;
