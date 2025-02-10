// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './UpdateUserProfile.css';
// // import '../../src/App.css'

// import toast, { Toaster } from 'react-hot-toast';

// function Update() {
//     const location = useLocation();
//     const navigate = useNavigate();

//     const [user, setUser] = useState(location.state || {
//         firstname: '',
//         lastname: '',
//         email: '',
//         mobileNo: '',
//         course: '',
//         enrollment: '',
//         password: '',
//         createdAt: '',
//         updatedAt: '',
//         userID: ''
//     });

//     useEffect(() => {
//         if (location.state.user) {
//             setUser(location.state.user);
//         }
//     }, [location.state.user]);

//     const [current_User, setCurrent_User] = useState({
//         email: '',
//         role: '' // Add role to the user state
//     });

//     const updateUser = (updatedUser) => {
//         const uID = user.userID;
//         let endpoint = '';
//         if (current_User.role === 'admin') {
//             endpoint = `http://localhost:3000/admin/profile/update/${uID}`;
//         } else if (current_User.role === 'faculty') {
//             endpoint = `http://localhost:3000/faculty/profile/update/${uID}`;
//         } else if (current_User.role === 'student') {
//             endpoint = `http://localhost:3000/user/profile/update/${uID}`;
//         }

//         console.log(endpoint);
//         axios
//             .patch(endpoint, updatedUser)
//             .then((response) => {
//                 if (response.data.ok) {
//                     console.log('User updated successfully!');
//                     toast.success('User updated successfully!');
//                     navigate('/profile');
//                 }
//             })
//             .catch((error) => {
//                 toast.error("Error while updating data");
//                 console.error('Error updating user:', error);
//             });

//         // axios
//         //     .patch(`http://localhost:3000/user/profile/update/${uID}`, updatedUser)
//         //     .then((response) => {
//         //         if (response.data.ok) {
//         //             console.log('User updated successfully!');
//         //             toast.success('User updated successfully!');
//         //             navigate('/profile');
//         //         }
//         //     })
//         //     .catch((error) => {
//         //         toast.error("Error while updating data");
//         //         console.error('Error updating user:', error);
//         //     });
//     };

//     const handleInputChange = (event) => {
//         console.log('handleInputChange called');
//         const { name, value } = event.target;
//         setUser((prevUser) => ({ ...prevUser, [name]: value }));
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         updateUser(user);
//     };

//     return (
//         <div className="update-container">
//             <form className="update-form" onSubmit={handleSubmit}>
//                 <h1 className="update-header">Update User Information</h1>

//                 <div className="input-group">
//                     <label className="update-label">First Name:</label>
//                     <input
//                         type="text"
//                         name="firstname"
//                         className="update-input"
//                         value={user.firstname}
//                         onChange={handleInputChange}
//                     />
//                 </div>

//                 <div className="input-group">
//                     <label className="update-label">Last Name:</label>
//                     <input
//                         type="text"
//                         name="lastname"
//                         className="update-input"
//                         value={user.lastname}
//                         onChange={handleInputChange}
//                     />
//                 </div>

//                 <div className="input-group">
//                     <label className="update-label">Mobile No:</label>
//                     <input
//                         type="tel"
//                         name="mobileNo"
//                         className="update-input"
//                         value={user.mobileNo}
//                         onChange={handleInputChange}
//                     />
//                 </div>

//                 <div className="input-group">
//                     <label className="update-label">Email:</label>
//                     <input
//                         type="text"
//                         name="email"
//                         className="update-input"
//                         value={user.email}
//                         onChange={handleInputChange}
//                     />
//                 </div>

//                 <div className="form-footer">
//                     <button type="submit" className="update-button">Update</button>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default Update;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import './UpdateUserProfile.css';
import "../../src/App.css";

import toast from "react-hot-toast";

function Update() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(
    location.state || {
      firstname: "",
      lastname: "",
      email: "",
      mobileNo: "",
      course: "",
      enrollment: "",
      password: "",
      createdAt: "",
      updatedAt: "",
      userID: "",
    },
  );

  useEffect(() => {
    if (location.state.user) {
      setUser(location.state.user);
    }
  }, [location.state.user]);

  const updateUser = (updatedUser) => {
    const uID = user.userID;
    axios
      .patch(`http://localhost:3000/user/profile/update/${uID}`, updatedUser)
      .then((response) => {
        if (response.data.ok) {
          console.log("User updated successfully!");
          toast.success("User updated successfully!");
          navigate("/profile");
        }
      })
      .catch((error) => {
        toast.error("Error while updating data");
        console.error("Error updating user:", error);
      });
  };

  const handleInputChange = (event) => {
    console.log("handleInputChange called");
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser(user);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Update</h1>
        <label>firstname:</label>
        <input
          type="text"
          name="firstname"
          value={user.firstname}
          onChange={handleInputChange}
        />
        <br />
        <label>last name:</label>
        <input
          type="text"
          name="lastname"
          value={user.lastname}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <label>Mobile No:</label>
        <input
          type="tel"
          name="mobileNo"
          value={user.mobileNo}
          onChange={handleInputChange}
        />
        <br />
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={user.email}
          onChange={handleInputChange}
        />
        <br />
        <label>Enrollment no:</label>
        <input
          type="text"
          name="enrollment"
          value={user.enrollment}
          onChange={handleInputChange}
        />
        <br />
        course:
        <select name="course" value={user.course} onChange={handleInputChange}>
          <option>please select your course</option>
          <option value="bba">bba</option>
          <option value="bca">bca</option>
          <option value="bcom">bcom</option>
          <option value="mba">mba</option>
          <option value="mca">mca</option>
          <option value="llb">llb</option>
          <option value="btech">btech</option>
        </select>
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default Update;
