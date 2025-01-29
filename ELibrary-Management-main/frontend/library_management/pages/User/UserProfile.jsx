<<<<<<< HEAD
import './UserProfile.css'; // Assuming you create this CSS file for styling
=======
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthProvider';

<<<<<<< HEAD
function User_Profile() {
  let { params } = useParams();
  const navigate = useNavigate();

=======

function User_Profile() {
  let { params } = useParams();
  const navigate = useNavigate();
 

  const [userData, setUserData] = useState(null)
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    mobileNo: '',
    course: '',
    enrollment: '',
    password: '',
<<<<<<< HEAD
    userID: ''
  });
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();
  const [current_User, setCurrent_User] = useState({
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
        setCurrent_User(prevUser => ({
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
=======
    // createdAt: '',
    // updatedAt: '',
    userID: ''
  });
  const { authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn } = useAuth();


  // useEffect(() => {
  //     const token = localStorage.getItem('JWT_Token');
  //     if (token) {
  //         axios.get('http://localhost:2000/user/auth', {
  //             headers: { Authorization: `Bearer ${token}` },
  //         })
  //             .then((response) => {
  //               console.log(response.data);
  //                 if (response.data.ok) {

  //                     const user_data = response.data.isVerified;
  //                     // setUserData(user_data);
  //                     console.log(user_data);
  //                     setUser({
  //                         username: user_data.firstname,
  //                         email: user_data.email,
  //                         mobileNo: user_data.mobileNo,
  //                         userID: user_data._id
  //                     });
  //                     console.log(user_data);

  //                 }
  //             })
  //             .catch((error) => {
  //                 console.error("gadbad hai kuch:", error);

  //             });




  //     }
  // }, []);

  // useEffect(() => {
  //   const token = localStorage.getItem('jwt_token');
  //   if (token) {
  //     axios.get('http://localhost:3000/user/auth', {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //       .then((response) => {
  //         if (response.data.ok) {
  //           setUser(response.data.isVerified);
  //           setIsLoggedIn(true);
  //           console.log("login successfully", response.data.isVerified);

  //           navigate('/');
  //         } else {
  //           console.log("authentication failed");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         // localStorage.removeItem('JWT_Token');
  //       });
  //   }
  // }, []);
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
<<<<<<< HEAD
      axios
        .get('http://localhost:3000/user/auth', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data.ok) {
            const user = response.data.user;
            setUser({
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              mobileNo: user.mobileNo,
              course: user.course,
              enrollment: user.enrollment,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
              userID: user._id,
            });
          } else {
            console.log('Authentication failed');
=======
      axios.get('http://localhost:3000/user/auth', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (response.data.ok) {
            console.log(response.data.user);
            const user=response.data.user;
            setUser({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            mobileNo: user.mobileNo,
            course: user.course,
            enrollment: user.enrollment,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            userID: user._id
            });
            console.log("login successfully");
          } else {
            console.log("authentication failed");
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d
          }
        })
        .catch((error) => {
          console.error(error);
<<<<<<< HEAD
        });
    }
    fetchUser();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/profile/update', { state: { user,current_User } });
  };

  return (
    <div className="profile-container">
      <h3 className="profile-header">User Profile</h3>
      <div className="profile-card">
        <form className="profile-form">
          <p className="profile-field">
            <span className="profile-label">First Name:</span>{' '}
            <span className="profile-value">{user.firstname}</span>
          </p>
          <p className="profile-field">
            <span className="profile-label">Last Name:</span>{' '}
            <span className="profile-value">{user.lastname}</span>
          </p>
          <p className="profile-field">
            <span className="profile-label">Email:</span>{' '}
            <span className="profile-value">{user.email}</span>
          </p>
          <p className="profile-field">
            <span className="profile-label">Mobile No:</span>{' '}
            <span className="profile-value">{user.mobileNo}</span>
          </p>


          {/* <p className="profile-field">
            <span className="profile-label">Enrollment No:</span>{' '}
            <span className="profile-value">{user.enrollment}</span>
          </p>
          <p className="profile-field">
            <span className="profile-label">Course:</span>{' '}
            <span className="profile-value">{user.course}</span>
          </p> */}
          <p className="profile-field">
            <span className="profile-label">Created At:</span>{' '}
            <span className="profile-value">{user.createdAt}</span>
          </p>
          <p className="profile-field">
            <span className="profile-label">Updated At:</span>{' '}
            <span className="profile-value">{user.updatedAt}</span>
          </p>
          {/* // <p className="profile-field">
          //   <span className="profile-label">User ID:</span>{' '}
          //   <span className="profile-value">{user.userID}</span>
          // </p> */}
          <button className="profile-button" onClick={handleClick}>
            Update Profile
          </button>


        </form>
      </div>
    </div>
=======
          // localStorage.removeItem('JWT_Token');
        });
    }
  }, []);
  

  // useEffect(() => {
  //     const uID = user.userID;
  //     axios.get(`http://localhost:2000/user/profile/${uID}`)
  //         .then((response) => {
  //             if (response.data.ok) {

  //                 const user_data = response.data.userFound;
  //                 setUserData(user_data);
  //                 console.log(user_data);
  //                 setUser({
  //                     ...user,
  //                     username: user_data.username,
  //                     firstname: user_data.firstname,
  //                     lastname: user_data.lastname,
  //                     mobileNo: user_data.mobileNo,
  //                     email: user_data.email,
  //                     followers: user_data.followers,
  //                     following: user_data.following,
  //                     createdAt: user_data.createdAt,
  //                     updatedAt: user_data.updatedAt,
  //                     userID: user_data._id,
  //                 });

  //             }
  //         })
  //         .catch(err => console.log(err))
  // }, [user.userID])


  const handleClick = (e) => {
    e.preventDefault();
    navigate('/profile/update', { state: { user } });
  }






  return (
    <>
      <h3>user profile</h3>

      <div>
        <form >
      
          <p>firstname: {user.firstname}</p>
          <p>lastname: {user.lastname}</p>
          <p>email : {user.email}</p>
          <p>mobileNo : {user.mobileNo}</p>
          <p>enrollment no:{user.enrollment}</p>
           <p>course : {user.course}</p> 
          <p>createdAt: {user.createdAt}</p>
          <p>updatedAt: {user.updatedAt}</p>
          <p>userid:{user.userID}</p>
          <button onClick={handleClick}>update profile</button>
        </form>
      </div>

    </>
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d
  );
}

export default User_Profile;