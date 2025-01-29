// src/UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewUsers.css';

const UserList = () => {
  const [faculty, setFaculties] = useState([]);
  const [student, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    mobileNo: '',
    course: '',
    enrollment: '',
    password: '',
    role: '',
  });





  const fetchData = async () => {
    try {
      const facultyResponse = await axios.get('http://localhost:3000/admin/get-faculties');
      const studentsResponse = await axios.get('http://localhost:3000/admin/get-students');
      setFaculties(facultyResponse.data.faculties);
      setStudents(studentsResponse.data.students);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };


  const [User, setUser] = useState({
    email: '',
    role: '' // Add role to the user state
  });


  const fetchUser = async () => {
    try {

      const token = localStorage.getItem('jwt_token');
      const userEmail = localStorage.getItem('user_email');
      const userRole = localStorage.getItem('user_role');

      if (token) {
        // Set the user state with the retrieved email and role
        setUser(prevUser => ({
          ...prevUser,
          email: userEmail,
          role: userRole
        }));
      }

    }
    catch (err) {
      console.error('Error fetching data:', err);

    }
  }

  useEffect(() => {
    fetchData();
    // fetchUser();
  }, []);




  const handleDelete = async (id, isFaculty) => {
    try {
      if (isFaculty) {
        await axios.delete(`http://localhost:3000/admin/faculty/${id}`);
      } else {
        await axios.delete(`http://localhost:3000/admin/student/${id}`);
      }
      fetchData();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (user) => {
    setEditMode(true);
    setCurrentUser(user);
    setFormData({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      mobileNo: user.mobileNo,
      course: user.course || '',
      enrollment: user.enrollment || '',
      password: '', // Do not pre-fill password for security reasons
      role: user.role,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const url =
        currentUser.role === 'faculty'
          ? `http://localhost:3000/admin/faculty/${currentUser._id}`
          : `http://localhost:3000/admin/student/${currentUser._id}`;
      await axios.patch(url, formData);
      setEditMode(false);
      setCurrentUser(null);
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        mobileNo: '',
        course: '',
        enrollment: '',
        password: '',
        role: '',
      });
      fetchData();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (loading) {
    return <div className="loadingText">Loading...</div>;
  }

  return (
    <div className="userListContainer">
      <h1 className="title">Faculty List</h1>
      <table className="userTable">
        <thead>
          <tr>
            <th className="tableHeader">First Name</th>
            <th className="tableHeader">Last Name</th>
            <th className="tableHeader">Email</th>
            <th className="tableHeader">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(faculty) &&
            faculty.map((fac) => (
              <tr key={fac._id} className="tableRow">
                <td>{fac.firstname}</td>
                <td>{fac.lastname}</td>
                <td>{fac.email}</td>
                <td>
                  <button
                    className="actionButton editButton"
                    onClick={() => handleEdit({ ...fac, role: 'faculty' })}
                  >
                    Edit
                  </button>
                  <button
                    className="actionButton deleteButton"
                    onClick={() => handleDelete(fac._id, true)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <h1 className="title">Student List</h1>
      <table className="userTable">
        <thead>
          <tr>
            <th className="tableHeader">First Name</th>
            <th className="tableHeader">Last Name</th>
            <th className="tableHeader">Email</th>
            <th className="tableHeader">Course</th>
            <th className="tableHeader">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(student) &&
            student.map((student) => (
              <tr key={student._id} className="tableRow">
                <td>{student.firstname}</td>
                <td>{student.lastname}</td>
                <td>{student.email}</td>
                <td>{student.course}</td>
                <td>
                  <button
                    className="actionButton editButton"
                    onClick={() => handleEdit({ ...student, role: 'student' })}
                  >
                    Edit
                  </button>
                  <button
                    className="actionButton deleteButton"
                    onClick={() => handleDelete(student._id, false)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {editMode && (
        <div className="editFormContainer">
          <h2 className="editFormTitle">Edit User</h2>
          <form className="editForm" onSubmit={handleUpdate}>
            <div className="formGroup">
              <label>First Name:</label>
              <input
                className="formInput"
                type="text"
                name="firstname"
                placeholder="First Name"
                value={formData.firstname}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="formGroup">
              <label>Last Name:</label>
              <input
                className="formInput"
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="formGroup">
              <label>Email:</label>
              <input
                className="formInput"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="formGroup">
              <label>Mobile No:</label>
              <input
                className="formInput"
                type="text"
                name="mobileNo"
                placeholder="Mobile No"
                value={formData.mobileNo}
                onChange={handleInputChange}
                required
              />
            </div>
            {formData.role === 'student' && (
              <>
                <div className="formGroup">
                  <label>Course:</label>
                  {/* <input
                    className="formInput"
                    type="text"
                    name="course"
                    placeholder="Course"
                    value={formData.course}
                    onChange={handleInputChange}
                  /> */}
                  <select name="course" className="formInput" value={formData.course} onChange={handleInputChange}>
                    <option value="">Please select your course</option>
                    <option value="bba">BBA</option>
                    <option value="bca">BCA</option>
                    <option value="bcom">BCOM</option>
                    <option value="mba">MBA</option>
                    <option value="mca">MCA</option>
                    <option value="llb">LLB</option>
                    <option value="btech">BTech</option>
                  </select>
                </div>
                <div className="formGroup">
                  <label>Enrollment:</label>
                  <input
                    className="formInput"
                    type="text"
                    name="enrollment"
                    placeholder="Enrollment"
                    value={formData.enrollment}
                    onChange={handleInputChange}
                  />
                </div>
              </>
            )}
            <button type="submit" className="submitButton">Update</button>
            <button
              type="button"
              className="cancelButton"
              onClick={() => {
                setEditMode(false);
                setCurrentUser(null);
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserList;
