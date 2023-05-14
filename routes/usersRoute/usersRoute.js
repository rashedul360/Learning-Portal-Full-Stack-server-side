const userRouter = require("express").Router();
const {
 getUsers,
 addUser,
 findSingleUser,
 findOneUser,
 updateUser,
 updateUserRole,
 updateUserStatus,
 deleteUser,
} = require("../../controler/userController/userController");
const expireTokenVerification = require("../../middlewares/ExpiredTokenVerification");
const { verifyUser } = require("../../middlewares/userVerification");
const verifyIsAdmin = require("../../middlewares/verifyIsAdmin");

userRouter.get("/users", expireTokenVerification, verifyUser, getUsers);
userRouter.get(
 "/user/:email/:id",
 expireTokenVerification,
 verifyUser,
 findOneUser
);
userRouter.post("/users/signup", addUser);
userRouter.post("/users/login", findSingleUser);
userRouter.patch("/user", expireTokenVerification, verifyUser, updateUser);
userRouter.patch(
 "/user/:email/:id",
 expireTokenVerification,
 verifyIsAdmin,
 updateUserRole
);
userRouter.patch(
 "/user/status/:email/:id",
 expireTokenVerification,
 verifyIsAdmin,
 updateUserStatus
);
userRouter.delete(
 "/user/delete/:email/:id",
 expireTokenVerification,
 verifyIsAdmin,
 deleteUser
);
module.exports = userRouter;
