import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

import '../../src/App.css'

import toast, { Toaster } from 'react-hot-toast';

function Update() {
    const location = useLocation();
    const navigate = useNavigate();

    const [user, setUser] = useState(location.state || {
        firstname: '',
        lastname: '',
        email: '',
        mobileNo: '',
        course: '',
        enrollment: '',
        password: '',
        createdAt: '',
        updatedAt: '',
        userID: ''
    });

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
                    console.log('User updated successfully!');
                    toast.success('User updated successfully!');
                    navigate('/profile');
                }
            })
            .catch((error) => {
                toast.error("Error while updating data");
                console.error('Error updating user:', error);
            });
    };

    const handleInputChange = (event) => {
        console.log('handleInputChange called');
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
                <select name='course' value={user.course} onChange={handleInputChange}>
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