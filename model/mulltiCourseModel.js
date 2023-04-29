const { Schema, model } = require("mongoose");
const multiCourseModel = new Schema(
 {
  course_id: {
   type: String,
   required: true,
  },
  course_name: {
   type: String,
   required: true,
  },
  author_name: {
   type: String,
   required: true,
  },
  languages: {
   type: Array,
   required: true,
  },
  description: {
   type: String,
   required: true,
  },
  price: {
   type: Number,
   required: true,
  },
  // course_videos: {
  //  type: [
  //   {
  //    module_name: {
  //     type: String,
  //     required: true,
  //    },
  //    videos: [
  //     {
  //      title: {
  //       type: String,
  //       required: true,
  //      },
  //      description: {
  //       type: String,
  //       required: true,
  //      },
  //      video_id: {
  //       type: String,
  //       required: true,
  //      },
  //      video_link: {
  //       type: String,
  //       required: true,
  //      },
  //      published_date: {
  //       type: String,
  //       required: true,
  //      },
  //      // notes: {
  //      //  type: File,
  //      //  required: false,
  //      // },
  //     },
  //    ],
  //   },
  //  ],
  // },
 },
 {
  timestamps: true,
 }
);

const multiCourse = model("learning_portal_multi_course", multiCourseModel);
module.exports = multiCourse;
