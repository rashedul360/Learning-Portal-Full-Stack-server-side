const user = require("../model/userModel");
let jwt = require("jsonwebtoken");
const verifyIsAdmin = (req, res, next) => {
 const { token } = req.headers;
 const splittedToken = token?.startsWith("Bearer") && token?.split("Bearer")[1];
 jwt.verify(splittedToken, "shhhhh", function (err, decoded) {
  let { email, id, name } = decoded?.userData || {};

  user?.findOne({ email }).then((data) => {
   // checking is this user registered?
   if (
    data?.email === email &&
    data?.id === id &&
    data?.name === name &&
    data?.role.includes("ADMIN") &&
    !err &&
    req.headers.origin === process.env.ORIGIN
   ) {
    return next();
   }
   // send unauthorized message
   return res.status(401).json({
    message: "unauthorized admin can access this feature",
    status: 401,
   });
  });
 });
};
module.exports = verifyIsAdmin;
