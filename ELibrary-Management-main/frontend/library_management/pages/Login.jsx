import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthProvider';
import { useNavigate, Link } from 'react-router-dom';
<<<<<<< HEAD
import './Login.css';
import 'boxicons/css/boxicons.min.css';
=======
import '../src/App.css'
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d

import toast, { Toaster } from 'react-hot-toast';
// import { response } from 'express';


function Login() {
  const { authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn } = useAuth();

  const navigate = useNavigate();

  const [token, setToken] = useState('');
  const [LoginInputs, setLoginInputs] = useState(
    {
<<<<<<< HEAD
      role: '',
=======
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d
      email: '',
      password: ''
    }
  );


<<<<<<< HEAD
  
=======
  //   useEffect(() => {
  //     const token = localStorage.getItem('JWT_Token');
  //     if (token) {
  //         axios.get('http://localhost:2000/user/auth', {
  //             headers: { Authorization: `Bearer ${token}` },
  //         })
  //             .then((response) => {
  //                 // setAuthUser(response.data);
  //                 setIsLoggedIn(true);
  //                 console.log("login successfully");
  //             })
  //             .catch((error) => {
  //                 console.error(error);
  //                 // localStorage.removeItem('JWT_Token');
  //             });
  //     }
  // }, []);
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d
  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      axios.get('http://localhost:3000/user/auth', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (response.data.ok) {
            setAuthUser(response.data.user);
            setIsLoggedIn(true);
            console.log("login successfully", response.data.user);

            navigate('/');
          } else {
            console.log("authentication failed");
          }
        })
        .catch((error) => {
          console.error(error);
          // localStorage.removeItem('JWT_Token');
        });
    }
  }, []);



  const handlOnChange = (e) => {
    setLoginInputs({ ...LoginInputs, [e.target.name]: e.target.value })


  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (LoginInputs.password.length < 8) {
      alert('Please fill in all fields and ensure password is at least 8 characters and matches confirm password');
      return;
    }
<<<<<<< HEAD
    
    console.log("LoginInputs:", LoginInputs); // Log inputs for debugging

    try {
      let response;

      if (LoginInputs.role === 'faculty') {
        response = await axios.post('http://localhost:3000/faculty/login', LoginInputs);
      } else if (LoginInputs.role === 'admin') {
        response = await axios.post('http://localhost:3000/admin/login', LoginInputs);
      } else {
        response = await axios.post('http://localhost:3000/user/login', LoginInputs);
      }

      if (response.data.ok) {
        const token = response.data.token;
        localStorage.setItem('jwt_token', token);
          localStorage.setItem('user_role', LoginInputs.role); // Store user role
          localStorage.setItem('user_email', LoginInputs.email);

        setAuthUser(LoginInputs.email);
        setIsLoggedIn(true);
        toast.success('Login Successfully!');
        navigate('/', { state: { LoginInputs } });
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error(err);
    }
  };
  return (

    <>


      {/* <form onSubmit={handleOnSubmit}>
=======
    try {


      const response = await axios.post('http://localhost:3000/user/login', LoginInputs, {
        headers: { 'Content-Type': 'application/json' },
      });



      setToken(response.data.token);
      localStorage.setItem('jwt_token', response.data.token);
      console.log(response.data.token);

      setAuthUser(LoginInputs.email);
      setIsLoggedIn(true);

      if (response.data.ok) {
        toast.success('Login Successfully!');
        console.log(response.data);
        navigate('/');
      }
      else {
        toast.error(response.data.message);
      }
    }
    catch (err) {
      toast.error("something happend wrong");
      console.error(err);
    }



  }
  return (
    <>


      <form onSubmit={handleOnSubmit}>
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d




        email:<input type='email' name='email' value={LoginInputs.email} onChange={handlOnChange} placeholder=' enter email-id' />
        <br></br>
        password:<input type='password' name='password' value={LoginInputs.password} onChange={handlOnChange} placeholder='enter password' />

        <br>
        </br>


        <input type='submit' value="Login" disabled={!LoginInputs.email || !LoginInputs.password} />
<<<<<<< HEAD
      </form> */}


      <>
        <body className="login-body">
          <form onSubmit={handleOnSubmit}>
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
              <div className="card login-card">
                <div className="login-card-body">
                  <img src="images/gls_logo.jpg" alt="Logo" className="login-card-logo" />
                  <h1 className="login-card-title">Login</h1>
                  
                  <div className="form-group">
                  <label >Role</label>
                  <select name='role' value={LoginInputs.role} onChange={handlOnChange} className='form-select login-form-control'>
                    <option>Select Role</option>
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                    <option value="admin">Admin</option>
                  </select>
                    <label >E-mail</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text login-input-group-text"><i className='bx bxs-user'></i></span>
                      </div>
                      <input type="text" id="username" name='email' value={LoginInputs.email} onChange={handlOnChange} className="form-control login-form-control"
                        placeholder="Enter your e-mail" required />
                    </div>
                    <div className="form-group login-form-group">
                    <label >Password</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text login-input-group-text"><i
                          className='bx bxs-lock-alt'></i></span>
                      </div>
                      <input type="password" id="password" className="form-control login-form-control" name='password' value={LoginInputs.password} onChange={handlOnChange}
                        placeholder="Enter your Password" required />
                    </div>
                  </div>
                  </div>

                 

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="form-check">
                      {/* <!-- <input type="checkbox" id="remember" className="form-check-input"> --> */}
                      <label className="form-check-label login-form-check-label"></label>
                    </div>
                    {/* <a href="forgot-password.html" className="login-text-muted" >Forgot Password?</a> */}
                    <Link to='/otp-verification' className="login-text-muted">Forgot Password?</Link>
                  </div>

                  <button type="submit" className="btn login-btn-primary btn-block">Login</button>
                  <div className="login-text-center mt-3">
                    <p className="mb-0" style={{ textAlign: 'center' }}>Don't have an account? <Link to='/register'>Sign
                      Up</Link></p>
                    {/* <Link to='/Admin_login'>click hear</Link>for Admin/faculty login */}
                  </div>

                </div>
              </div>
            </div>
          </form>
        </body>
      </>
    </>
  );


}

export default Login;
=======
      </form>

    </>
  )
}

export default Login;
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d
