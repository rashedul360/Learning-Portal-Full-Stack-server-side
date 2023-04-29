const {
 getAssignments,
 addAssignment,
 deleteAssignment,
 getSingleAssignment,
 updateAssignment,
} = require("../../controler/assignmentsController/assignmentsController");
const { verifyUser } = require("../../middlewares/userVerification");

const assignmentRoute = require("express").Router();
assignmentRoute.get("/assignments", getAssignments);
assignmentRoute.get("/assignment/:video_id", verifyUser, getSingleAssignment);
assignmentRoute.post("/assignments", addAssignment);
assignmentRoute.patch("/assignment", updateAssignment);
assignmentRoute.delete("/assignments/:id", deleteAssignment);
module.exports = assignmentRoute;
