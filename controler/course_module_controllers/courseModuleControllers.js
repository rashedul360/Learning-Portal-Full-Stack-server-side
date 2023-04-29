const courseModule = require("../../model/course_module_model");
const { v4: uuidv4 } = require("uuid");
//=============================get all course modules================================
const getAllCourseModules = (_req, res, next) => {
 return courseModule
  .find()
  .then((modules) =>
   modules !== null
    ? res
       .status(200)
       .json({ message: "course modules found", status: 200, modules })
    : res.status(404).json({ message: "course modules not found", status: 404 })
  )
  .catch((err) => next(err));
};
//=============================get single course modules================================
const getSingleCourseModules = (req, res, next) => {
 const { course_id } = req.params || {};
 if (course_id) {
  courseModule
   .find({ course_id })
   .then((modules) =>
    modules !== null
     ? res
        .status(200)
        .json({ message: "course modules found", status: 200, modules })
     : res
        .status(404)
        .json({ message: "course modules not found", status: 404 })
   )
   .catch((err) => next(err));
 }
};
const addCourseModule = (req, res, next) => {
 const { module_name, course_id, videos } = req.body || {};
 if (module_name && course_id && videos) {
  const newModule = new courseModule({
   module_name,
   module_id: uuidv4(),
   course_id,
   videos,
  });
  return newModule
   .save()
   .then((module) => res.json({ message: "successfully saved module", module }))
   .catch((err) => next(err));
 }
 return res.status(400).json({ message: "bad request" });
 // module_id
};
const updateCourseModule = () => {};
const deleteCourseModule = () => {};
module.exports = {
 getAllCourseModules,
 getSingleCourseModules,
 addCourseModule,
 updateCourseModule,
 deleteCourseModule,
};
