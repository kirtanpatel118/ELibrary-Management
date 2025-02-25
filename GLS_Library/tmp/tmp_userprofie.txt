import { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthProvider';


function User_Profile() {
  let { params } = useParams();
  const navigate = useNavigate();
 

  const [userData, setUserData] = useState(null)
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    mobileNo: '',
    course: '',
    enrollment: '',
    password: '',
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

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
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
          }
        })
        .catch((error) => {
          console.error(error);
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
  );
}

export default User_Profile;