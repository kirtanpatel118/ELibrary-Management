const Faculty = require('../../Model/Faculty'); // Adjust the path as necessary
const Student = require('../../Model/Student');  // Adjust the path as necessary



const AllStudents=async (req, res) => {
    try {
      const students = await Student.find();
      res.json({students,ok:true});
    } catch (error) {
      res.status(500).json({ message: error.message,ok:false });
    }
  };

const AllFaculties=async (req, res) => {
    try {
      const faculties = await Faculty.find();
      res.json({faculties,ok:true});
    } catch (error) {
      res.status(500).json({ message: error.message,ok:false });
    }
  };

  const UpdateFaculty=async (req, res) => {
    try {
      const updatedFaculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json({message:'Faculty upadate successfully', ok:true,updatedFaculty});
    } catch (error) {
      res.status(500).json({ message: error.message,ok:false });
    }
  };
  
  const UpdateStudent=async (req, res) => {
    try {
      const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json({message:'Student upadate successfully', ok:true,updatedStudent});
    } catch (error) {
      res.status(500).json({ message: error.message,ok:false });
    }
  };

  const DeleteFaculty=async (req, res) => {
    try {
      await Faculty.findByIdAndDelete(req.params.id);
      res.json({ message: 'Faculty deleted',ok:true });
    } catch (error) {
      res.status(500).json({ message: error.message ,ok:false});
    }
  };

  const DeleteStudent= async (req, res) => {
    try {
      await Student.findByIdAndDelete(req.params.id);
      res.json({ message: 'Student deleted',ok:true });
    } catch (error) {
      res.status(500).json({ message: error.message,ok:false });
    }
  };

module.exports={AllStudents,AllFaculties,UpdateStudent,UpdateFaculty,DeleteStudent,DeleteFaculty}