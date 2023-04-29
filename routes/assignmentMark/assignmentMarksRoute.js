const {
 getAllAssignmentMark,
 addAssignmentMark,
 getSingleAssignmentMark,
 updateAssignmentMark,
 deleteAssignmentMark,
} = require("../../controler/assignmentMarksController/assignmentMarksController");
const { verifyUser } = require("../../middlewares/userVerification");
const verifyIsAdmin = require("../../middlewares/verifyIsAdmin");

const assignmentMarksRoute = require("express").Router();
//============================ get single assignment mark (admin can access) ========================================
assignmentMarksRoute.get(
 "/assignmentMarks",
 verifyIsAdmin,
 getAllAssignmentMark
);
//======================   =================
assignmentMarksRoute.post(
 "/assignmentMarks/:assignment_id/:student_id",
 verifyUser,
 getSingleAssignmentMark
);
//====================== add  assignment mark (user can do it. by submitting assignment)  =================
assignmentMarksRoute.post("/assignmentMarks", verifyUser, addAssignmentMark);
//============================ update  assignment mark (only admin)  ========================================
assignmentMarksRoute.patch(
 "/assignmentMarks/:assignment_id",
 verifyIsAdmin,
 updateAssignmentMark
);
//============================ delete  assignment mark (only admin)  ========================================
assignmentMarksRoute.delete(
 "/assignmentMarks/:assignment_id",
 verifyIsAdmin,
 deleteAssignmentMark
);
module.exports = assignmentMarksRoute;
