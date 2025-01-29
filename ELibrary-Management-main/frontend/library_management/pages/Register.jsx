import { useState } from 'react';
import axios from 'axios';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../src/styles/sign-up.css';
=======
import { Navigate, useNavigate, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d

function Register() {
  const [Ok, setOk] = useState(false);
  const navigate = useNavigate();
<<<<<<< HEAD
=======
  
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d

  const [RegisterInputs, setRegisterInputs] = useState({
    firstname: '',
    lastname: '',
    email: '',
    mobileNo: '',
<<<<<<< HEAD
    role: '',
    course: '',
    enrollment: '',
    faculty_id: '',
    dateOfJoining: '',
    dateOfLeaving: '',
    department_id: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    firstname: '',
    lastname: '',
    email: '',
    mobileNo: '',
    enrollment: '',
    course: '',
    faculty_id: '',
    dateOfJoining: '',
    dateOfLeaving: '',
    department_id: '',
=======
    course: '',
    enrollment: '',
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d
    password: '',
    confirmPassword: ''
  });

  const handleOnChange = (e) => {
    e.preventDefault();
    setRegisterInputs({ ...RegisterInputs, [e.target.name]: e.target.value });
<<<<<<< HEAD

    // Validate input fields on change
    validateField(e.target.name, e.target.value);
  };

  const validateField = (fieldName, value) => {
    let errorMsg = '';
    switch (fieldName) {
      case 'firstname':
      case 'lastname':
        errorMsg = value.trim() === '' ? `${fieldName} is required` : '';
        break;
      case 'email':
        errorMsg = !/\S+@\S+\.\S+/.test(value) ? 'Please enter a valid email' : (!/\d/.test(value) ? 'Email should contain at least one number' : '');
        break;
      case 'mobileNo':
        errorMsg = !/^\d{10}$/.test(value) ? 'Please enter a valid mobile number' : '';
        break;
      case 'password':
        errorMsg = value.length < 8 ? 'Password should be at least 6 characters' : '';
        break;
      case 'confirmPassword':
        errorMsg = value !== RegisterInputs.password ? 'Passwords do not match' : '';
        break;
      case 'enrollment':
        errorMsg = RegisterInputs.role === 'student' && value.trim() === '' ? 'Enrollment number is required' : '';
        break;
      case 'course':
        errorMsg = RegisterInputs.role === 'student' && value === '' ? 'Please select a course' : '';
        break;
      case 'faculty_id':
        errorMsg = RegisterInputs.role === 'faculty' && value.trim() === '' ? 'Faculty ID is required' : '';
        break;
      case 'dateOfJoining':
        errorMsg = RegisterInputs.role === 'faculty' && value.trim() === '' ? 'Date of Joining is required' : '';
        break;
      // case 'dateOfLeaving':
      //   errorMsg = RegisterInputs.role === 'faculty' && value.trim() === '' ? 'Date of Leaving is required' : '';
      //   break;
      case 'department_id':
        errorMsg = RegisterInputs.role === 'faculty' && value.trim() === '' ? 'Department ID is required' : '';
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: errorMsg
    }));
=======
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    console.log(RegisterInputs);

    // Check for errors before submitting
    for (const field in RegisterInputs) {
      validateField(field, RegisterInputs[field]);
    }

    if (Object.values(errors).some((err) => err !== '')) {
      toast.error('Please fix the errors before submitting.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/user/register', RegisterInputs);
      if (response.data.ok) {
        toast.success('Register Successfully!');
        setOk(true);
        console.log('Response from server:', response.data);
        navigate('/login');
      }
    } catch (err) {
      toast.error(err.response?.data?.message);
      console.error("Something went wrong");
=======
    try {
      const response = await axios.post('http://localhost:3000/user/register', RegisterInputs);
      if (response.data.ok) {
        toast.success('register Successfully!');
        setOk(true);
        console.log('Response from server:', response.data);
        navigate('/login')
      }
    } catch (err) {
      
      toast.error(err.response?.data?.message);
      console.error("something wrong")
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d
    }
  };

  return (
<<<<<<< HEAD
    <div className="signup-body">
      <div className="signup-wrapper">
        <form onSubmit={handleOnSubmit}>
          <img src="images/gls_logo.jpg" alt="Logo" className="login-card-logo" />
          <h1>Register</h1>
          
          <div className="signup-input-box">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              name="firstname"
              value={RegisterInputs.firstname}
              onChange={handleOnChange}
              placeholder="Enter your first name"
            />
            {errors.firstname && <span className="error-text">{errors.firstname}</span>}
          </div>

          <div className="signup-input-box">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={RegisterInputs.lastname}
              onChange={handleOnChange}
              placeholder="Enter your last name"
            />
            {errors.lastname && <span className="error-text">{errors.lastname}</span>}
          </div>

          <div className="signup-input-box">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={RegisterInputs.email}
              onChange={handleOnChange}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="signup-input-box">
            <label htmlFor="mobileNo">Mobile No.</label>
            <input
              type="tel"
              name="mobileNo"
              value={RegisterInputs.mobileNo}
              onChange={handleOnChange}
              placeholder="Enter your mobile number"
            />
            {errors.mobileNo && <span className="error-text">{errors.mobileNo}</span>}
          </div>

          <div className="signup-input-box">
            <label htmlFor="role">Role</label>
            <select name="role" value={RegisterInputs.role} onChange={handleOnChange}>
              <option value="">Please select your role</option>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
              <option value="faculty">Faculty</option>
            </select>
            {errors.role && <span className="error-text">{errors.role}</span>}
          </div>

          {RegisterInputs.role === 'student' && (
            <>
              <div className="signup-input-box">
                <label htmlFor="enrollment">Enrollment</label>
                <input
                  type="text"
                  name="enrollment"
                  value={RegisterInputs.enrollment}
                  onChange={handleOnChange}
                  placeholder="Enter your enrollment number"
                />
                {errors.enrollment && <span className="error-text">{errors.enrollment}</span>}
              </div>

              <div className="signup-input-box">
                <label htmlFor="course">Course</label>
                <select name="course" value={RegisterInputs.course} onChange={handleOnChange}>
                  <option value="">Please select your course</option>
                  <option value="bba">BBA</option>
                  <option value="bca">BCA</option>
                  <option value="bcom">BCOM</option>
                  <option value="mba">MBA</option>
                  <option value="mca">MCA</option>
                  <option value="llb">LLB</option>
                  <option value="btech">BTech</option>
                </select>
                {errors.course && <span className="error-text">{errors.course}</span>}
              </div>
            </>
          )}

          {RegisterInputs.role === 'faculty' && (
            <>
              <div className="signup-input-box">
                <label htmlFor="faculty_id">Faculty ID</label>
                <input
                  type="text"
                  name="faculty_id"
                  value={RegisterInputs.faculty_id}
                  onChange={handleOnChange}
                  placeholder="Enter your faculty ID"
                />
                {errors.faculty_id && <span className="error-text">{errors.faculty_id}</span>}
              </div>
              <div className="signup-input-box">
                <label htmlFor="dateOfJoining">Date of Joining</label>
                <input
                  type="date"
                  name="dateOfJoining"
                  value={RegisterInputs.dateOfJoining}
                  onChange={handleOnChange}
                />
                {errors.dateOfJoining && <span className="error-text">{errors.dateOfJoining}</span>}
              </div>
              <div className="signup-input-box">
                <label htmlFor="dateOfLeaving">Date of Leaving</label>
                <input
                  type="date"
                  name="dateOfLeaving"
                  value={RegisterInputs.dateOfLeaving}
                  onChange={handleOnChange}
                />
                {errors.dateOfLeaving && <span className="error-text">{errors.dateOfLeaving}</span>}
              </div>
              <div className="signup-input-box">
                <label htmlFor="department_id">Department</label>
                <input
                  type="text"
                  name="department_id"
                  value={RegisterInputs.department_id}
                  onChange={handleOnChange}
                  placeholder="Enter your department"
                />
                {errors.department_id && <span className="error-text">{errors.department_id}</span>}
              </div>
            </>
          )}

          <div className="signup-input-box">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={RegisterInputs.password}
              onChange={handleOnChange}
              placeholder="Enter your password"
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="signup-input-box">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={RegisterInputs.confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="signup-btn-primary" disabled={Object.values(errors).some((err) => err !== '')}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
=======
    <>
      {/* <h1>REgister</h1> */}
      <form onSubmit={handleOnSubmit}>
        first Name:<input type="text" name="firstname" value={RegisterInputs.firstname} onChange={handleOnChange} placeholder='enter your first name' />
        <br></br>
        lastname Name:<input type="text" name="lastname" value={RegisterInputs.lastname} onChange={handleOnChange} placeholder='enter your last name' />
        <br></br>
        email id:<input type='email' name='email' value={RegisterInputs.email} onChange={handleOnChange} placeholder='enter your emailid' />
        <br></br>
        mobile no:<input type='tel' name='mobileNo' value={RegisterInputs.mobileNo} onChange={handleOnChange} placeholder=' enter your mobile no' />
        <br></br>
        Enrollment no:<input type='text' name='enrollment' value={RegisterInputs.enrollment} onChange={handleOnChange} placeholder=' enter your enrollment no' />
        <br></br>
        course:
        <select name='course' value={RegisterInputs.course} onChange={handleOnChange}>
          <option>please select your course</option>
          <option value="bba">bba</option>
          <option value="bca">bca</option>
          <option value="bcom">bcom</option>
          <option value="mba">mba</option>
          <option value="mca">mca</option>
          <option value="llb">llb</option>
          <option value="btech">btech</option>
        </select>
        <br></br>
        password:<input type='password' name='password' value={RegisterInputs.password} onChange={handleOnChange} placeholder='enter password' />
        <br>
        </br>
        confirm password:<input type='password' name='confirmPassword' value={RegisterInputs.confirmPassword} onChange={handleOnChange} placeholder='enter password' />
        <br>
        </br>

        <button type='submit' disabled={
          !RegisterInputs.firstname ||
          !RegisterInputs.lastname ||
          !RegisterInputs.email ||
          !RegisterInputs.mobileNo ||
          !RegisterInputs.enrollment ||
          !RegisterInputs.course ||
          !RegisterInputs.password ||
          RegisterInputs.password !== RegisterInputs.confirmPassword
        } >Submit</button>
      </form>

    </>
  );
}

export default Register;
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d
