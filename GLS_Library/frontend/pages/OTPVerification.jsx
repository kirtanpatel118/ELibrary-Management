import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import './OTPVerification.css';

function OTPVerification() {
  const [Email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!Email.trim()) {
      toast.error('Please enter your email address');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('https://elibrary-management.onrender.com/admin/send-otp', { Email });
      if (response.data.ok) {
        toast.success('OTP sent to your email!');
        setIsOtpSent(true);
      } else {
        toast.error('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      toast.error('Error sending OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      toast.error('Please enter the OTP');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('https://elibrary-management.onrender.com/admin/verify-otp', {
        Email,
        received_otp: otp,
      });
      if (response.data.ok) {
        toast.success('OTP verified successfully!');
        navigate('/forgot-password');
      } else {
        toast.error('Invalid OTP. Please try again.');
      }
    } catch (error) {
      toast.error('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-body">
      <Toaster position="top-center" />
      <div className="otp-card">
        <img src="/images/gls_logo.jpg" alt="GLS Logo" className="otp-logo" />
        <h2 className="otp-title">OTP Verification</h2>
        <p className="otp-subtitle">
          {isOtpSent
            ? 'Enter the 6-digit OTP sent to your email'
            : 'Enter your registered email to receive an OTP'}
        </p>

        <div className="otp-form-group">
          <label className="otp-label">Email Address</label>
          <div className="otp-input-wrapper">
            <span className="otp-input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
              </svg>
            </span>
            <input
              type="email"
              className="otp-input"
              placeholder="Enter your email address"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isOtpSent}
            />
          </div>
        </div>

        {!isOtpSent ? (
          <button
            className="otp-btn"
            onClick={handleSendOtp}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        ) : (
          <>
            <div className="otp-form-group">
              <label className="otp-label">Enter OTP</label>
              <div className="otp-input-wrapper">
                <span className="otp-input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56"/>
                    <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 1 1 9.5 6.5"/>
                  </svg>
                </span>
                <input
                  type="text"
                  className="otp-input otp-code-input"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                />
              </div>
            </div>
            <button
              className="otp-btn"
              onClick={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <button
              className="otp-btn-secondary"
              onClick={() => { setIsOtpSent(false); setOtp(''); }}
            >
              Change Email
            </button>
          </>
        )}

        <div className="otp-back-link">
          <Link to="/login">← Back to Login</Link>
        </div>
      </div>
    </div>
  );
}

export default OTPVerification;
