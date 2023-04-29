const {
 getEnrolledCourses,
 addEnrollmentCourse,
 getAllEnrolledCourses,
} = require("../../controler/userEnrollmentControllers/userEnrollmentControllers");
const { verifyUser } = require("../../middlewares/userVerification");
const verifyIsAdmin = require("../../middlewares/verifyIsAdmin");

const enrollmentRoute = require("express").Router();
enrollmentRoute.get("/enrollments", verifyIsAdmin, getAllEnrolledCourses);
enrollmentRoute.post("/enrollments", verifyUser, addEnrollmentCourse);
enrollmentRoute.get("/enrollment/:email/:id", verifyUser, getEnrolledCourses);
module.exports = enrollmentRoute;
