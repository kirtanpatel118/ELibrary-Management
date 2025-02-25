const Student = require('../Model/Student');
const Admin = require('../Model/Admin');
const Faculty = require('../Model/Faculty');
const Contact = require('../Model/Contact');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const bcrypt = require('bcrypt');
const Register = async (req, res) => {
    console.log('register route from backend')

    const reg_data = req.body;
    // console.log(reg_data);
    const user_data = req.body;
    // const email = req.body.email;
    // const mobileNo = req.body.mobileNo;
    console.log(user_data);
    // check if user already exist
    // const exist_username = await User.findOne({ username });

    // if (exist_username) {
    //     return res.json({ ok: false, message: 'username is  already exist' });
    // }



    const role = user_data.role;
    if (role === 'student') {
        const email = user_data.email;
        const mobileNo = user_data.mobileNo;
        const exist_email = await Student.findOne({ email });
        const exist_mobile = await Student.findOne({ mobileNo });

        if (exist_email) {
            return res.json({ ok: false, message: 'email is  already exist' });

        }
        else if (exist_mobile) {
            return res.json({ ok: false, message: 'mobile is  already exist' });
        }

        try {
            const new_user_data = new Student(user_data);
            const save_data = await new_user_data.save();
            console.log("received client data is: ", user_data)
            return res.json({ ok: true, message: 'registration complate' });


        } catch (error) {
            console.log("REGISTERED FAILED =>", error);
            return res.status(500).json({ ok: false, message: 'error in registration /n registration failed' });

        }
    }
    else if (role === 'faculty') {
        const email = user_data.email;
        const mobileNo = user_data.mobileNo;
        const exist_email = await Faculty.findOne({ email });
        const exist_mobile = await Faculty.findOne({ mobileNo });
        if (exist_email) {
            return res.json({ ok: false, message: 'email is  already exist' });

        }
        else if (exist_mobile) {
            return res.json({ ok: false, message: 'mobile is  already exist' });
        }

        try {
            const new_user_data = new Faculty(user_data);
            const save_data = await new_user_data.save();
            console.log("received client data is: ", user_data)
            return res.json({ ok: true, message: 'registration complate' });


        } catch (error) {
            console.log("REGISTERED FAILED =>", error);
            return res.status(500).json({ ok: false, message: 'error in registration /n registration failed' });

        }
    }
    else {
        const email = user_data.email;
        const mobileNo = user_data.mobileNo;
        const exist_email = await Admin.findOne({ email });
        const exist_mobile = await Admin.findOne({ mobileNo });

        if (exist_email) {
            return res.json({ ok: false, message: 'email is  already exist' });

        }
        else if (exist_mobile) {
            return res.json({ ok: false, message: 'mobile is  already exist' });
        }

        try {

            const new_user_data = new Admin(user_data);
            const save_data = await new_user_data.save();
            console.log("received client data is: ", user_data)
            return res.json({ ok: true, message: 'registration complate' });


        } catch (error) {
            console.log("REGISTERED FAILED =>", error);
            return res.status(500).json({ ok: false, message: 'error in registration /n registration failed' });

        }
    }



};


const Login = async (req, res) => {
    const { role, email, password } = req.body;
    if (role === 'admin') {

        const exist_user = await Admin.findOne({ 'email': email });

        if (!exist_user) {
            console.log('user not founded');
            return res.status(404).json({ ok: false, message: 'User not found' });
        }


        // Check password
        const isValidPassword = await bcrypt.compare(password, exist_user.password);
        if (!isValidPassword) {
            return res.status(401).json({ ok: false, message: 'Incorrect password' });
        }

        console.log("user found /n login successful");

        try {


            const token = await exist_user.generateToken();
            const userId = exist_user._id.toString();
            // console.log("token: ", token, "\n userId: ", userId);
            res.status(200).json({ ok: true, message: 'Login successful', token, userId });
        }
        catch (err) {
            res.json({ ok: false, message: 'error while generating token' });

            console.error("error while generating token: =>", err);
        }
    }
    else if (role === 'faculty') {
        const exist_user = await Faculty.findOne({ 'email': email });

        if (!exist_user) {
            console.log('user not founded');
            return res.status(404).json({ ok: false, message: 'User not found' });
        }


        // Check password
        const isValidPassword = await bcrypt.compare(password, exist_user.password);
        if (!isValidPassword) {
            return res.status(401).json({ ok: false, message: 'Incorrect password' });
        }

        console.log("user found /n login successful");

        try {


            const token = await exist_user.generateToken();
            const userId = exist_user._id.toString();
            // console.log("token: ", token, "\n userId: ", userId);
            res.status(200).json({ ok: true, message: 'Login successful', token, userId });
        }
        catch (err) {
            res.json({ ok: false, message: 'error while generating token' });

            console.error("error while generating token: =>", err);
        }
    }
    else {
        const exist_user = await Student.findOne({ 'email': email });

        if (!exist_user) {
            console.log('user not founded');
            return res.status(404).json({ ok: false, message: 'User not found' });
        }


        // Check password
        const isValidPassword = await bcrypt.compare(password, exist_user.password);
        if (!isValidPassword) {
            return res.status(401).json({ ok: false, message: 'Incorrect password' });
        }

        console.log("user found /n login successful");

        try {


            const token = await exist_user.generateToken();
            const userId = exist_user._id.toString();
            // console.log("token: ", token, "\n userId: ", userId);
            res.status(200).json({ ok: true, message: 'Login successful', token, userId });
        }
        catch (err) {
            res.json({ ok: false, message: 'error while generating token' });

            console.error("error while generating token: =>", err);
        }
    }

    // console.log('login route from backend')

    // return res.send({ message: 'login route from backend', ok: true })

};



// const auth_me = async (req, res) => {


//     const token = req.header('Authorization');
//     console.log("token; aa gay ", token);
//     if (!token) {
//         return res.json({ message: "Unauthorized HTTP, Token not provided" });
//     }
//     //hear removing pre-fix  bearer from token
//     const jwtToken = token.replace("Bearer", "").trim();
//     console.log("token from sender: ", jwtToken);

//     try {

//         const isVerified = await jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
//         if (isVerified) {
//             console.log("!!");
//             console.log("token verify ho gay this is data: ", isVerified);
//             console.log("!!");
//         }
//         if (isVerified.role === 'student')
//         {
//             const u_id = isVerified._id;
//             const user = await Student.findById(u_id);
//             if (!user) {
//                 console.log("User not found")
//                 return res.status(404).send({ error: 'User not found' });
//             };
    
//             console.log("user firstname: ", user.firstname, "\nuser lastname:", user.lastname, "\n user email: ", user.email, "\n user mobile:", user.mobileNo, "\ncourse:", user.course, "\nenrollment:", user.enrollment);
//             return res.json({ message: 'token valid haii', ok: true, user });

//         }
//         else if(isVerified.role === 'faculty')
//         {
//             const u_id = isVerified._id;
//             const user = await Faculty.findById(u_id);
//             if (!user) {
//                 console.log("User not found")
//                 return res.status(404).send({ error: 'User not found' });
//             };
    
//             console.log("user firstname: ", user.firstname, "\nuser lastname:", user.lastname, "\n user email: ", user.email, "\n user mobile:", user.mobileNo, "\nfaculty id:", user.faculty_id, "\department id:", user.department_id);
//             return res.json({ message: 'token valid haii', ok: true, user });

//         }
//         else{
//             const u_id = isVerified._id;
//             const user = await Admin.findById(u_id);
//             if (!user) {
//                 console.log("User not found")
//                 return res.status(404).send({ error: 'User not found' });
//             };
    
//             console.log("user firstname: ", user.firstname, "\nuser lastname:", user.lastname, "\n user email: ", user.email, "\n user mobile:", user.mobileNo);
//             return res.json({ message: 'token valid haii', ok: true, user });
//         }


//         // const u_name = isVerified.firstname;
//         // const u_email=isVerified.email;
//         // const u_mb=isVerified.mobileNo;


//         // const u_id = isVerified._id;
//         // const user = await Student.findById(u_id);
//         // if (!user) {
//         //     console.log("User not found")
//         //     return res.status(404).send({ error: 'User not found' });
//         // };

//         // console.log("user firstname: ", user.firstname, "\nuser lastname:", user.lastname, "\n user email: ", user.email, "\n user mobile:", user.mobileNo, "\ncourse:", user.course, "\nenrollment:", user.enrollment);
//         // return res.json({ message: 'token valid haii', ok: true, user });


//         // const userData = await Student.findOne({ email: u_email });
//         // console.log(userData);
//         // if (userData) {
//         //     console.log("user found");
//         //    return res.json({ message: 'token valid haii' ,ok:true,isVerified});
//         // }
//         // else {
//         //     console.log("user not found");
//         //     return res.status(401).json({ message: "User not found",ok:false });
//         // }

//     }
//     catch (error) {
//         return res.status(401).json({ message: "Unauthorized. Invalid token" });
//     }
// };


const auth_me = async (req, res) => {
    const token = req.header('Authorization');
    console.log("Received token:", token);
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized HTTP, Token not provided" });
    }

    // Remove "Bearer " prefix from token
    const jwtToken = token.replace("Bearer ", "").trim();
    console.log("JWT Token from sender:", jwtToken);

    try {
        const isVerified = await jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        console.log("Token verified, data:", isVerified);

        const u_id = isVerified._id;
        let user;

        switch (isVerified.role) {
            case 'student':
                user = await Student.findById(u_id);
                break;
            case 'faculty':
                user = await Faculty.findById(u_id);
                break;
            case 'admin':
                user = await Admin.findById(u_id);
                break;
            default:
                return res.status(403).json({ message: "Unauthorized role" });
        }

        if (!user) {
            console.log("User  not found");
            return res.status(404).json({ error: 'User  not found' });
        }

        console.log("User  details:", user);
        return res.json({ message: 'Token is valid', ok: true, user });

    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ message: "Unauthorized. Invalid token" });
    }
};


const contact = async (req, res) => {
    const user_contact_data = req.body;
    console.log('name:', user_contact_data.name, '\nemail:', user_contact_data.email, "\nmessage:", user_contact_data.message);
    try {
        const user_con = new Contact(user_contact_data);
        const save_data = await user_con.save();
        console.log("received client data is: ", user_contact_data)
        return res.json({ ok: true, message: 'registration complate' });


    } catch (error) {
        console.log("REGISTERED FAILED =>", error);
        return res.status(500).json({ ok: false, message: 'error in registration /n registration failed' });

    }
}




module.exports = { Register, Login, auth_me, contact };

