const { v4: uuidv4 } = require("uuid");
const userEnrolledCourse = require("../../model/user_Course_enrollment");
//=======================find all enrolled courses (admin can see that)====================================
const getAllEnrolledCourses = (_req, res, next) => {
 userEnrolledCourse
  .find()
  .then((enrollments) =>
   enrollments !== null
    ? res
       .status(200)
       .json({
        message: `enrollment found ${enrollments.length}`,
        enrollments,
        status: 200,
       })
    : res.status(404).json({ message: "enrollments not found", status: 404 })
  );
};
//=======================find student enrolled courses (student can see that)====================================
const getEnrolledCourses = (req, res, next) => {
 const { email, id } = req.params || {};
 if (email && id) {
  return userEnrolledCourse
   .find({ email, user_id: id })
   .then((courses) =>
    courses !== null
     ? res.status(200).json({
        message: "successfully found enrolled courses",
        courses,
        status: 200,
       })
     : res.status(404).json({
        message: "enrolled course not found",
        courses,
        status: 404,
       })
   )
   .catch((err) => next(err));
 }
 return res.status(400).json({ message: "bad request", status: 400 });
};
//================================assign enrollment (student can do that)=========================================
const addEnrollmentCourse = (req, res, next) => {
 const { author_name, course_name, languages, course_id, email, id } =
  req.body || {};
 userEnrolledCourse.findOne({ course_id, email, user_id: id }).then((data) => {
  if (data?.enrollment_id) {
   return res.json({ message: "already enrolled this course", error: "exist" });
  } else {
   if (author_name && course_name && languages && course_id && email && id) {
    const newEnrollment = new userEnrolledCourse({
     enrollment_id: uuidv4(),
     author_name,
     course_id,
     course_name,
     languages,
     email,
     user_id: id,
    });
    return newEnrollment
     .save()
     .then((enrollment) =>
      res.status(200).json({
       message: "successfully enrolled course",
       status: 200,
       enrollment,
      })
     )
     .catch((err) => next(err));
   }
   return res.status(400).json({ message: "bad request", status: 400 });
  }
 });
};
module.exports = {
 getAllEnrolledCourses,
 getEnrolledCourses,
 addEnrollmentCourse,
};
