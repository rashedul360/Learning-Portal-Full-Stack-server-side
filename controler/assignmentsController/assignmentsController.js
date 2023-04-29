const assignment = require("../../model/assignmentsModel");
const { v4: uuidv4 } = require("uuid");
//============================ get all assignments ========================================
const getAssignments = (_req, res) => {
 assignment.find().then((data) => res.json(data));
};
//============================ get single assignment ========================================

const getSingleAssignment = (req, res, next) => {
 const { video_id } = req.params; // filter must be a object
 assignment
  .findOne({ video_id })
  .then((data) => {
   data !== null
    ? res.status(200).json({ assignment: data, status: 200 })
    : res.status(404).json({ message: "assignment not found", status: 404 });
  })
  .catch((err) => next(err));
};
//============================ add a new assignment ========================================
const addAssignment = (req, res) => {
 const { video_id, video_title, total_mark, assignment_title } = req.body;

 return assignment.findOne({ video_id }).then((data) => {
  if (data?.video_id === video_id) {
   return res
    .status(200)
    .json({ message: "assignment already exists", assignment: data });
  }
  // checking is all data are valid?
  if (video_id && video_title && total_mark && assignment_title) {
   const newAssignment = new assignment({
    assignment_id: uuidv4(),
    video_id,
    video_title,
    assignment_title,
    total_mark,
   });

   //response for not valid data
   return newAssignment.save().then((data) => res.status(201).json(data));
  }
  return res.status(404).json({ message: "bad request" });
 });
};
//============================ update an assignment ========================================
const updateAssignment = (req, res) => {
 const { filter, data } = req.body || {}; // filter must be a object
 const { total_mark, video_title } = data || {};
 if (filter && data && total_mark && video_title) {
  assignment
   .findOneAndUpdate(
    { ...filter },
    {
     $set: {
      total_mark,
      video_title,
     },
    }
   )
   .then((data) =>
    data !== null
     ? res
        .status(200)
        .json({ message: "successfully updated", assignment: data })
     : res.status(404).json({ message: "assignment not found" })
   );
 } else {
  res.status(404).json({ message: "bad request" });
 }
};

//============================ delete an assignment ========================================
const deleteAssignment = (req, res) => {
 const { id } = req.params;
 assignment.findOneAndDelete({ assignment_id: id }).then((assignment) => {
  assignment !== null
   ? res
      .status(200)
      .json({ message: "successfully deleted assignment", assignment })
   : res.status(404).json({ message: "assignment does not exist" });
 });
};
module.exports = {
 getAssignments,
 getSingleAssignment,
 addAssignment,
 updateAssignment,
 deleteAssignment,
};
