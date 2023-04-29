const { Schema, model } = require("mongoose");

const userCourseEnrollMentModel = new Schema({
 enrollment_id: {
  type: String,
  required: true,
 },
 author_name: {
  type: String,
  required: true,
 },
 course_id: {
  type: String,
  required: true,
 },
 course_name: {
  type: String,
  required: true,
 },
 languages: {
  type: Array,
  required: true,
 },
 user_id: {
  type: String,
  required: true,
 },
 email: {
  type: String,
  required: true,
 },
});
const userEnrolledCourse = model(
 "Learning_portal_user_course_enrollment",
 userCourseEnrollMentModel
);
module.exports = userEnrolledCourse;
