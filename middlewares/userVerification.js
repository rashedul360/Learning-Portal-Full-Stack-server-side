const user = require("../model/userModel");
let jwt = require("jsonwebtoken");
const verifyUser = (req, res, next) => {
 // find token from headers
 const { token } = req.headers;
 const splittedToken = token?.startsWith("Bearer") && token?.split("Bearer")[1];
 // decode jwt token
 jwt.verify(splittedToken, "shhhhh", function (err, decoded) {
  let { email, id, name } = decoded?.userData || {};
  console.log(req.headers.origin);
  user?.findOne({ email }).then((data) => {
   // checking is this user registered?
   if (
    data?.email === email &&
    data?.id === id &&
    data?.name === name &&
    !err
    // && req.headers.origin === process.env.ORIGIN
   ) {
    return next();
   }
   // send unauthorized message
   return res.status(401).json({ message: "unauthorized", status: 401 });
  });
 });
};
module.exports = {
 verifyUser,
};
