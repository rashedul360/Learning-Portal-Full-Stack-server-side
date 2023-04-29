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
const { verifyUser } = require("../../middlewares/userVerification");
const verifyIsAdmin = require("../../middlewares/verifyIsAdmin");

userRouter.get("/users", verifyUser, getUsers);
userRouter.get("/user/:email/:id", verifyUser, findOneUser);
userRouter.post("/users/signup", addUser);
userRouter.post("/users/login", findSingleUser);
userRouter.patch("/user", verifyUser, updateUser);
userRouter.patch("/user/:email/:id", verifyIsAdmin, updateUserRole);
userRouter.patch("/user/status/:email/:id", verifyIsAdmin, updateUserStatus);
userRouter.delete("/user/delete/:email/:id", verifyIsAdmin, deleteUser);
module.exports = userRouter;
