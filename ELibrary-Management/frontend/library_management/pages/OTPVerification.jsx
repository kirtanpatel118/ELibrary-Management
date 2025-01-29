import React, { useState } from 'react';
import axios from 'axios';

import toast, { Toaster } from 'react-hot-toast';

import { useNavigate, Link } from 'react-router-dom';

function OTPVerification ()  {
    const [Email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);

    const navigate = useNavigate();

    const handleSendOtp = async () => {
        console.log(Email);
        try {
            const response = await axios.post('http://localhost:3000/admin/send-otp', { Email });
            if(response.data.ok)
            {
                
                setMessage('OTP sent successfully.');
                setIsOtpSent(true);
            }
            else
            {
                setMessage('Failed to send OTP. Please try again.');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            setMessage('Error sending OTP. Please try again.');
        }
    };
        // console.log(message,isOtpSent);

    const handleVerifyOtp = async () => {
        try {
            const received_otp=otp;
            const response = await axios.post('http://localhost:3000/admin/verify-otp', { Email, received_otp });
            // setMessage(response.data);
            // console.log(Email,received_otp);
            if (response.data.ok) {
                setMessage('OTP verified successfully.');
                toast.success('OTP verified successfully');
                navigate('/forgot-password');
            } else {
                setMessage('Invalid OTP. Please try again.');
                toast.error('Invalid OTP. Please try again.')
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setMessage('Invalid OTP. Please try again.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>OTP Verification</h2>
            <div>
                <input
                    type="text"
                    placeholder="Enter your Email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={handleSendOtp}>Send OTP</button>
            </div>
            {isOtpSent && (
                <div style={{ marginTop: '20px' }}>
                    <input
                        type="text"
                        placeholder="Enter the OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <button onClick={handleVerifyOtp}>Verify OTP</button>
                </div>

            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default OTPVerification;