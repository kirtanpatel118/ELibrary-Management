import { useState } from 'react';
import axios from 'axios';
import '../src/styles/sign-up.css';

import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';
import React from 'react';

function Register() {
  const navigate = useNavigate();

  const [RegisterInputs, setRegisterInputs] = useState({
    firstname: '',
    lastname: '',
    email: '',
    mobileNo: '',
    role: '',
    course: '',
    enrollment: '',
    faculty_id: '',
    dateOfJoining: '',
    dateOfLeaving: '',
    department_id: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleOnChange = (e) => {
    setRegisterInputs({ ...RegisterInputs, [e.target.name]: e.target.value });
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
        errorMsg = !/\S+@\S+\.\S+/.test(value)
          ? 'Please enter a valid email'
          : !/\d/.test(value)
          ? 'Email should contain at least one number'
          : '';
        break;
      case 'mobileNo':
        errorMsg = !/^\d{10}$/.test(value) ? 'Please enter a valid mobile number' : '';
        break;
      case 'password':
        errorMsg = value.length < 8 ? 'Password should be at least 8 characters' : '';
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
      case 'department_id':
        errorMsg = RegisterInputs.role === 'faculty' && value.trim() === '' ? 'Department ID is required' : '';
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: errorMsg,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

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
        navigate('/login');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="signup-body">
      <div className="signup-wrapper">
        <form onSubmit={handleOnSubmit}>
          <img src="images/gls_logo.jpg" alt="Logo" className="login-card-logo" />
          <h1>Register</h1>

          <div className="signup-input-box">
            <label htmlFor="firstname">First Name</label>
            <input type="text" name="firstname" value={RegisterInputs.firstname} onChange={handleOnChange} placeholder="Enter your first name" />
            {errors.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
            firstname && <span className="error-text">{errors.firstname}</span>}
          </div>

          <div className="signup-input-box">
            <label htmlFor="lastname">Last Name</label>
            <input type="text" name="lastname" value={RegisterInputs.lastname} onChange={handleOnChange} placeholder="Enter your last name" />
            {errors.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error            
            lastname && <span className="error-text">{errors.lastname}</span>}
          </div>

          <div className="signup-input-box">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" value={RegisterInputs.email} onChange={handleOnChange} placeholder="Enter your email" />
            {errors.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
            email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="signup-input-box">
            <label htmlFor="mobileNo">Mobile No.</label>
            <input type="tel" name="mobileNo" value={RegisterInputs.mobileNo} onChange={handleOnChange} placeholder="Enter your mobile number" />
            {errors.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
            mobileNo && <span className="error-text">{errors.mobileNo}</span>}
          </div>

          <div className="signup-input-box">
            <label htmlFor="role">Role</label>
            <select name="role" value={RegisterInputs.role} onChange={handleOnChange}>
              <option value="">Please select your role</option>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
              <option value="faculty">Faculty</option>
            </select>
          </div>

          <div className="signup-input-box">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" value={RegisterInputs.password} onChange={handleOnChange} placeholder="Enter your password" />
            {errors.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
            password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="signup-input-box">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" name="confirmPassword" value={RegisterInputs.confirmPassword} onChange={handleOnChange} placeholder="Confirm your password" />
            {errors.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error            
            confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
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
