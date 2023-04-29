//=========================//import packages and modules//=============================
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/usersRoute/usersRoute");
const homeController = require("./controler/homeController");
const healthController = require("./controler/healthController");
const morgan = require("morgan");

const uri = require("./db/connection");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const multiCourseRouter = require("./routes/multiCourse/multiCourseRoute");
const assignmentRoute = require("./routes/assignments/assignmentsRoute");
const assignmentMarksRoute = require("./routes/assignmentMark/assignmentMarksRoute");
const promoCodeRouter = require("./routes/promose_code/promo_code_routes");
const courseModuleRoute = require("./routes/course_module/courseModuleRoutes");
const enrollmentRoute = require("./routes/enrollmentCourses/enrollmentCoursesRoute");

//=============================//constant variables//===============================================
const PORT = process.env.PORT || 8080;
// ==================================MIDDLEWARE====================================================
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

// =======================================================================================
//           -----------------------------routes--------------------------------
//========================================================================================

//==============================//user router//==============================
app.use("/api/v1", userRouter);
////==============================//MULTI courses//==============================
app.use("/api/v1", multiCourseRouter);
////==============================//assignments//==============================
app.use("/api/v1", assignmentRoute);
////==============================//assignment marks//==============================
app.use("/api/v1", assignmentMarksRoute);
////==============================//promo code//==============================
app.use("/api/v1", promoCodeRouter);
////==============================//course module//==============================
app.use("/api/v1", courseModuleRoute);
////==============================//enrollment module//==============================
app.use("/api/v1", enrollmentRoute);

// static routes
app.get("/health", healthController);

app.get("/", homeController);

//======================//application running methods or functionality//==========================
mongoose
 .connect(uri, {
  useNewUrlParser: true,
 })
 .then((_res) =>
  app.listen(PORT, () => console.log(`application listening on port ${PORT}`))
 )
 .catch((err) => console.log(`server error: ${err}`));
