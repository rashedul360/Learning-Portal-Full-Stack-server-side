const courseModule = require("../../model/course_module_model");
const multiCourse = require("../../model/mulltiCourseModel");
const { v4: uuidv4 } = require("uuid");
const {
 deleteEnrollment,
} = require("../userEnrollmentControllers/userEnrollmentControllers");
const {
 deleteCourseModules,
} = require("../course_module_controllers/courseModuleControllers");
///-=====================get=====================
const getAllCourses = (_req, res, next) => {
 multiCourse.find().then((data) => res.status(200).json(data));
};
///-=====================add=====================
const addACourse = (req, res, next) => {
 const { course_name, author_name, languages, description, price } = req.body;

 try {
  if (course_name && author_name && description && languages && price) {
   const newCourse = new multiCourse({
    course_id: uuidv4(),
    course_name,
    author_name,
    price,
    description,
    languages,
   });
   return newCourse.save().then((value) => res.json(value));
  }
  return res.json({ message: "bad request" });
 } catch {
  return next();
 }
};
///-=====================update=====================
const updateCourse = (req, res) => {
 const { filter, course_name } = req.body;
 filter
  ? multiCourse
     .findOneAndUpdate(
      { ...filter },
      {
       $set: {
        course_name,
       },
      }
     )
     .then((data) => res.json(data))
  : res.json({ message: "method not allowed" });
};
///-=====================delete course=====================
const deleteCourse = (req, res) => {
 const { course_id } = req.body;

 multiCourse
  .findOneAndDelete({ course_id })
  .then(deleteEnrollment(course_id))
  .then(deleteCourseModules(course_id))
  .then((data) =>
   data !== null
    ? res.status(200).json(data)
    : res.status(404).json({ message: "course not found" })
  );
};

module.exports = {
 getAllCourses,
 addACourse,
 updateCourse,
 deleteCourse,
};
