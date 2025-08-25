// src/components/BackButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Using react-router-dom for navigation

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="srvc-dtls-bck go-home" onClick={goBack}>
      <img src="/images/srvc-dtls-bck-icon.png" alt="Back" />
    </div>
  );
};

export default BackButton;