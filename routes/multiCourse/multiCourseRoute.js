const {
 addACourse,
 getAllCourses,
 updateCourse,
 deleteCourse,
} = require("../../controler/multiCourseController/multiCourseControllers");
const { verifyUser } = require("../../middlewares/userVerification");
const verifyIsAdmin = require("../../middlewares/verifyIsAdmin");

const multiCourseRouter = require("express").Router();
multiCourseRouter.get("/courses", verifyUser, getAllCourses);
multiCourseRouter.post("/courses", verifyIsAdmin, addACourse);
multiCourseRouter.patch("/courses", verifyIsAdmin, updateCourse);
multiCourseRouter.delete("/courses", verifyIsAdmin, deleteCourse);
module.exports = multiCourseRouter;
