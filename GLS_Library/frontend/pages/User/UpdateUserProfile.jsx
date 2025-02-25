import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './UpdateUserProfile.css';
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
        <div className="update-profile-container">
            <form className="update-profile-form" onSubmit={handleSubmit}>
                <h1 className="update-profile-header">Update User Information</h1>
                
                <div className="update-profile-input-group">
                    <label className="update-profile-label">First Name:</label>
                    <input
                        type="text"
                        name="firstname"
                        className="update-profile-input"
                        value={user.firstname}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="update-profile-input-group">
                    <label className="update-profile-label">Last Name:</label>
                    <input
                        type="text"
                        name="lastname"
                        className="update-profile-input"
                        value={user.lastname}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="update-profile-input-group">
                    <label className="update-profile-label">Mobile No:</label>
                    <input
                        type="tel"
                        name="mobileNo"
                        className="update-profile-input"
                        value={user.mobileNo}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="update-profile-input-group">
                    <label className="update-profile-label">Email:</label>
                    <input
                        type="text"
                        name="email"
                        className="update-profile-input"
                        value={user.email}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="update-profile-input-group">
                    <label className="update-profile-label">Enrollment No:</label>
                    <input
                        type="text"
                        name="enrollment"
                        className="update-profile-input"
                        value={user.enrollment}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="update-profile-input-group">
                    <label className="update-profile-label">Course:</label>
                    <select
                        name="course"
                        className="update-profile-select"
                        value={user.course}
                        onChange={handleInputChange}
                    >
                        <option value="">Please select your course</option>
                        <option value="bba">BBA</option>
                        <option value="bca">BCA</option>
                        <option value="bcom">BCom</option>
                        <option value="mba">MBA</option>
                        <option value="mca">MCA</option>
                        <option value="llb">LLB</option>
                        <option value="btech">BTech</option>
                    </select>
                </div>

                <div className="update-profile-form-footer">
                    <button type="submit" className="update-profile-button">Update</button>
                </div>
            </form>
        </div>
    );
}

export default Update;
