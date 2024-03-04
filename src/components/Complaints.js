import React, { useState } from 'react';
import StepByStepGuide from './StepByStepGuide';
import './CyberbullyingInfo.css';
import axios from 'axios';

const ReportForm = () => {
  const [incidentDetails, setIncidentDetails] = useState('');
  const [evidence, setEvidence] = useState(null);

  const handleInputChange = (e) => {
    setIncidentDetails(e.target.value);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setEvidence(file);
  };

  const sendSMS = async (message) => {
    const apiUrl = `https://api.twilio.com/2010-04-01/Accounts/AC723cd8060130e7160edf3f4ae00146c7/Messages.json`;

    try {
      await axios.post(
        apiUrl,
        null,
        {
          params: {
            To: '7275147891', // Replace with the recipient's phone number
            From:'+19387770612', // Replace with your Twilio phone number
            Body: message,
          },
          auth: {
            username: 'AC723cd8060130e7160edf3f4ae00146c7', // Your Twilio account SID
            password: '12346bf55e33c828c4e221fc2666f35b', // Your Twilio authentication token
          },
        }
      );

      // Optionally display a success message to the user
      alert('Report submitted successfully. SMS sent.');
    } catch (error) {
      // Handle any errors that occur during SMS sending
      console.error('Error sending SMS:', error.response ? error.response.data : error.message);
      alert('Error sending SMS. Please try again later.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the incident details as an SMS
    sendSMS(`Incident Details: ${incidentDetails}`);

    // Implement the logic for submitting the report here
    console.log('Incident Details:', incidentDetails);
    console.log('Evidence:', evidence);

    // Reset form fields if needed
    setIncidentDetails('');
    setEvidence(null);
  };

  return (
    <div className="r">
      <div className="report-form">
        <h1>Report Cyberbullying</h1>
        <img
          src="https://static.vecteezy.com/system/resources/previews/024/501/257/original/cyber-bullying-and-online-crime-concept-png.png"
          alt="Cyberbullying Awareness"
          className="cyberbullying-image"
        />
        <StepByStepGuide />
        <form onSubmit={handleSubmit}>
          {/* Step 5: Complete the Complaint Form */}
          <div className="form-group">
            <label htmlFor="incidentDetails">Incident Details</label>
            <textarea
              id="incidentDetails"
              value={incidentDetails}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="evidence">Evidence</label>
            <input
              type="file"
              id="evidence"
              accept=".png, .jpg, .jpeg, .gif, .pdf"
              onChange={handleFileUpload}
              required
            />
          </div>
          {/* Step 8: Review and Submit */}
          <button className="btn" type="submit">
            Submit Report
          </button>
        </form>
      </div>
      <a
        className="a"
        href="https://cybercrime.gov.in/Webform/crmcondi.aspx"
        target="_blank"
        rel="noopener noreferrer"
      >
        Visit the official website to report Cyberbullying
      </a>
    </div>
  );
};

export default ReportForm;
