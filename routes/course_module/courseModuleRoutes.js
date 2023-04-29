const {
 getAllCourseModules,
 getSingleCourseModules,
 addCourseModule,
 updateCourseModule,
 deleteCourseModule,
} = require("../../controler/course_module_controllers/courseModuleControllers");
const { verifyUser } = require("../../middlewares/userVerification");
const verifyIsAdmin = require("../../middlewares/verifyIsAdmin");

const courseModuleRoute = require("express").Router();
//============================get all modules===============================
courseModuleRoute.get("/course-modules", verifyIsAdmin, getAllCourseModules);
//============================get single course module===============================
courseModuleRoute.get(
 "/course-modules/:course_id",
 verifyUser,
 getSingleCourseModules
);
//============================add course module===============================
courseModuleRoute.post("/course-modules", verifyIsAdmin, addCourseModule);
//============================update single course module===============================
courseModuleRoute.patch(
 "/course-modules/:module_id",
 verifyIsAdmin,
 updateCourseModule
);
//============================delete single course module===============================
courseModuleRoute.delete(
 "/course-modules/:module_id",
 verifyIsAdmin,
 deleteCourseModule
);
module.exports = courseModuleRoute;
