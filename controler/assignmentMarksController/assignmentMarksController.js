const { v4: uuidv4 } = require("uuid");
const assignmentMark = require("../../model/assignmentMarksModel");

//============================ get all assignment marks ========================================
const getAllAssignmentMark = (_req, res, next) => {
 return assignmentMark
  .find()
  .then((data) =>
   data !== null
    ? res.status(200).json({ assignmentMarks: data, status: 200 })
    : res
       .status(404)
       .json({ message: "assignment Marks not found", status: 404 })
  )
  .catch((err) => next(err));
};
//============================ get single assignment mark (student can access) ====================================
const getSingleAssignmentMark = (req, res) => {
 const { assignment_id, student_id } = req.params;
 assignmentMark.findOne({ assignment_id, student_id }).then((data) => {
  data !== null
   ? res.status(200).json(data)
   : res.status(404).json({ message: "mark not found" });
 });
};
//====================== add  assignment mark (user can do it. by submitting assignment)  =================
const addAssignmentMark = (req, res, next) => {
 const {
  student_id,
  assignment_id,
  student_name,
  title,
  mark,
  total_mark,
  repo_link,
 } = req.body || {};

 //  new mark
 const newAssignmentMark = new assignmentMark({
  ass_mark_id: uuidv4(),
  student_id,
  student_name,
  assignment_id,
  title,
  total_mark,
  mark,
  repo_link,
  status: "pending",
 });
 //  find mark if already submitted
 assignmentMark.findOne({ student_id, assignment_id }).then((data) => {
  if (data === null) {
   if (
    student_id &&
    student_name &&
    title &&
    mark &&
    total_mark &&
    repo_link &&
    assignment_id
   ) {
    return newAssignmentMark
     .save()
     .then((data) =>
      res.status(200).json({ mark: data, status: 200, error: "exist" })
     )
     .catch((err) => next(err));
   }
   return res
    .status(400)
    .json({ message: "invalid data", data: req.body, status: 400 });
  } else {
   return res
    .status(200)
    .json({ message: "assignment already submitted", status: 200 });
  }
 });
};
//============================ update  assignment mark  (only admin)========================================
const updateAssignmentMark = (req, res) => {
 const { assignment_id } = req.params || {};
 const { mark, status } = req.body;
 assignment_id && mark && status
  ? assignmentMark
     .findOneAndUpdate(
      { ass_mark_id: assignment_id },
      {
       $set: {
        mark,
        status,
       },
      }
     )
     .then((data) =>
      data !== null
       ? res.json({
          message: "successfully updated assignment mark",
          status: 200,
         })
       : res
          .status(404)
          .json({ message: "assignment mark does not exist", status: 404 })
     )
  : res.json({ message: "invalid data" });
};
//============================ delete  assignment mark (only admin)  ========================================
const deleteAssignmentMark = (req, res) => {
 const { assignment_id } = req.params || {};
 assignmentMark
  .findOneAndDelete({ assignment_id })
  .then((data) =>
   data !== null
    ? res.status(200).json({ message: "assignment mark deleted successfully" })
    : res.status(404).json({ message: "assignment mark not found" })
  );
};
module.exports = {
 getAllAssignmentMark,
 getSingleAssignmentMark,
 addAssignmentMark,
 updateAssignmentMark,
 deleteAssignmentMark,
};
