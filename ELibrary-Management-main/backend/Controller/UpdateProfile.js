const Student=require('../Model/Student');
const Faculty=require('../Model/Faculty');
const Admin=require('../Model/Admin');



const UpdateStudentProfile = async (req, res) => {
    try {
        const id = req.params.uID;
        const body = req.body;
        console.log(id, " !! ", body);
        const updatedUser = await Student.findByIdAndUpdate(id, body, { new: true });
        if (!updatedUser) {
            console.log('profile update nahi hui ')
            return res.status(404).json({ ok: false, message: 'User not found' });
        }
        console.log("profile update ho gai ");
        res.json({ ok: true, message: 'User updated successfully', updatedUser });
    } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
    }
};


const UpdateFacultyProfile = async (req, res) => {
    try {
        const id = req.params.uID;
        const body = req.body;
        console.log(id, " !! ", body);
        const updatedUser = await Faculty.findByIdAndUpdate(id, body, { new: true });
        if (!updatedUser) {
            console.log('profile update nahi hui ')
            return res.status(404).json({ ok: false, message: 'User not found' });
        }
        console.log("profile update ho gai ");
        res.json({ ok: true, message: 'User updated successfully', updatedUser });
    } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
    }
};


const UpdateAdminProfile = async (req, res) => {
    try {
        const id = req.params.uID;
        const body = req.body;
        console.log(id, " !! ", body);
        const updatedUser = await Admin.findByIdAndUpdate(id, body, { new: true });
        if (!updatedUser) {
            console.log('profile update nahi hui ')
            return res.status(404).json({ ok: false, message: 'User not found' });
        }
        console.log("profile update ho gai ");
        res.json({ ok: true, message: 'User updated successfully', updatedUser });
    } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
    }
};

module.exports={UpdateStudentProfile,UpdateFacultyProfile,UpdateAdminProfile};