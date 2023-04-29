const user = require("../../model/userModel");
const { v4: uuidv4 } = require("uuid");
var bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");

//==================================== getting all users =====================================
const getUsers = (_req, res, next) => {
 user
  .find()
  .then((data) => {
   data !== null
    ? res.status(200).json({
       message: `total user found ${data.length}`,
       users: data,
       status: 200,
      })
    : res.status(400).json({ message: "users not found", status: 404 });
  })
  .catch((_err) => {
   res.send("error occurred");
  })
  .catch((err) => next(err));
};
//================================== adding a user sign up page  ==========================
const addUser = async (req, res, next) => {
 const { name, email, password } = req.body || {};
 // password hashing
 let hashPassword = await bcrypt.hash(password, 11);
 // checking is this user already in our registered database
 user
  .findOne({ email })
  .then((data) => {
   if (data?.email) {
    return res.json({
     message: "Email already exists",
     user: data,
    });
   }
   // if the user passed valid data we will create  new one
   if (name && email && password) {
    const newUser = new user({
     id: uuidv4(),
     name: `${name}`,
     email: `${email}`,
     role: ["STUDENT"], // role is the collections of  array of string
     password: `${hashPassword}`,
     status: "active",
    });
    return newUser.save().then((value) =>
     res.status(201).json({
      message: "successfully created a new user. please login your account",
      user: value,
      status: 200,
     })
    );
   } else {
    return res
     .status(405)
     .json({ message: "not valid data", data: req.body || {} });
   }
  })
  .catch((err) => next(err));
};

//=================== find one user by email and password. it's login handler =================
const findSingleUser = (req, res, next) => {
 const { email, password } = req.body || {};
 user
  .findOne({ email })
  .then(async (data) => {
   // password match checking
   let match = false;
   if (data?.email) match = await bcrypt.compare(password, data?.password);
   if (data?.email && match) {
    let userData = { ...data?._doc };
    delete userData?.password;
    // generate token
    let token = jwt.sign({ userData, website: "learning_portal" }, "shhhhh", {
     expiresIn: "24h",
    });
    // back response
    return res.json({
     user: userData,
     accessToken: token,
    });
   }
   return res.json({ message: "user not registered" });
  })
  .catch((err) => next(err));
};
//========================== find single user ===============================================
const findOneUser = (req, res, next) => {
 const { email, id } = req.params || {};
 email
  ? user
     .findOne({ email, id })
     .then((user) => {
      const findedUser = { ...user?._doc };
      delete findedUser.password;
      user !== null
       ? res
          .status(200)
          .json({ message: "user found", user: findedUser, status: 200 })
       : res.status(404).status({ message: "user not found" });
     })
     .catch((err) => next(err))
  : res.json({ message: "method not allowed" });
};
//========================== update a user ===============================================
const updateUser = async (req, res, next) => {
 const { filter, name, email, password } = req.body || {};
 if (name && email && filter) {
  let updateObj = { name, email };
  if (password !== "") {
   let hashPassword = await bcrypt.hash(password, 11);
   updateObj.password = hashPassword;
  }
  user
   .findOneAndUpdate(
    { ...filter },
    {
     $set: {
      ...updateObj,
     },
    }
   )
   .then((user) => {
    user !== null
     ? res
        .status(200)
        .json({ message: "user updated successfully", user, status: 200 })
     : res
        .status(404)
        .json({ message: "user not found", status: 404, data: { ...filter } });
   })
   .catch((err) => next(err));
 } else {
  return res.status(405).json({ message: "method not allowed", status: 405 });
 }
};
// ===================update user role only admin can access this route===================
const updateUserRole = (req, res, next) => {
 const { id, email } = req.params || {};
 const { role } = req.body || {};
 user
  .findOneAndUpdate(
   { email, id },
   {
    $set: {
     role,
    },
   },
   {
    returnDocument: "after",
   }
  )
  .then((user) => {
   user !== null
    ? res
       .status(200)
       .json({ message: "successfully updated user role", user, status: 200 })
    : res.status(404).json({ message: "user not found", status: 404 });
  })
  .catch((err) => next(err));
};
// ===================update user status only admin can access this route===================
const updateUserStatus = (req, res, next) => {
 const { id, email } = req.params || {};
 const { status } = req.body || {};
 if (id && email && status) {
  return user
   .findOneAndUpdate(
    { email, id },

    {
     $set: {
      status,
     },
    },
    {
     returnDocument: "after",
    }
   )
   .then((user) => {
    user !== null
     ? res.status(200).json({
        message: "successfully updated user status",
        user,
        status: 200,
       })
     : res.status(404).json({ message: "user not found", status: 404 });
   })
   .catch((err) => next(err));
 }
 return res.status(400).json({ message: "method not allowed", status: 400 });
};
const deleteUser = (req, res, next) => {
 const { email, id } = req.params || {};
 if (email && id) {
  return user
   .findOneAndDelete({ email, id }, { returnDocument: "after" })
   .then((user) =>
    user !== null
     ? res
        .status(200)
        .json({ message: "successfully deleted user", status: 200 })
     : res.status(404).json({ message: "user not found", status: 404 })
   )
   .catch((err) => next(err));
 }
 return res
  .status(400)
  .json({ message: "invalid credentials method not allowed", status: 400 });
};
module.exports = {
 getUsers,
 addUser,
 findSingleUser,
 findOneUser,
 updateUser,
 updateUserRole,
 updateUserStatus,
 deleteUser,
};
