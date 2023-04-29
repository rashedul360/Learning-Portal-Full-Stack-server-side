const { Schema, model } = require("mongoose");

const courseModuleModel = new Schema({
 module_name: {
  type: String,
  required: true,
 },
 module_id: {
  type: String,
  required: true,
  unique: true,
 },
 course_id: {
  type: String,
  required: true,
  rel: "multiCourseModel",
 },
 videos: {
  type: [
   {
    title: {
     type: String,
     required: true,
    },
    description: {
     type: String,
     required: true,
    },
    video_id: {
     type: String,
     required: true,
    },
    video_link: {
     type: String,
     required: true,
    },
    published_date: {
     type: String,
     required: true,
    },
   },
  ],
 },
});

const courseModule = model("learning_portal_course_module", courseModuleModel);
module.exports = courseModule;
