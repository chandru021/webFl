import React, { useState, useEffect } from 'react';
import './ComplaintDetail.css';
import axios from 'axios'; // Import Axios
import Chatbot from './chatBot';

function ComplaintDetails({ complaint, onClose }) {
  // Define the status options
  const statusOptions = ['registered', 'in progress', 'closed'];
  const [message, setMessage] = useState('');

  const [content , setContent] = useState('');

  // State to track the selected status and whether there are changes
  const [selectedStatus, setSelectedStatus] = useState("registered");
  const [isDirty, setIsDirty] = useState(false);

  const [isMessageSummarised, setIsMessageSummed] = useState(false);

  const handleSumMessage = () => {
    axios.post('http://localhost:8000/summariseSolution', { query : complaint.complaint.split("+").join(" ") })
      .then((response) => {
        console.log(response);
        setContent(response.data.message)
        setIsMessageSummed(true);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };


  // Function to handle status change
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);
    setIsDirty(newStatus !== complaint.status); // Mark as dirty if status is different from original
  };

  // Function to handle the update button click
  const handleUpdateClick = async () => {
    // Make a PUT request to update the status in the backend
    try {
      await axios.put(`http://localhost:8000/updateStatus`, { complaint_id: complaint._id, status
      : selectedStatus });

      setIsDirty(false); // Reset dirty flag
      console.log('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Effect to reset dirty flag when complaint changes
  useEffect(() => {
    setSelectedStatus(complaint.status);
    setIsDirty(false);
  }, [complaint]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    // Handle sending message logic here
    console.log('Sending message:', message);
    setMessage(''); // Clear the input after sending
  };

  return (
    <div className="complaint-details">
      <div className="complaint-details-backdrop" onClick={onClose}></div>
      <div className="complaint-details-content">
        <div className="left-half">
          <h2>Complaint Details</h2>
          <p><strong>Number:</strong> {complaint._id}</p>
          {/* <p><strong>Subject:</strong> {complaint.subject}</p> */}
          <p><strong>Description:</strong> {complaint.complaint.split("+").join(" ")}</p>
          {/* <p><strong>Remediation:</strong> {complaint.remediation}</p> */}
          <p><strong>Date:</strong> {complaint.regDate}</p>
          <label htmlFor="status"><strong>Status:</strong></label>
          <select id="status" value={selectedStatus} onChange={handleStatusChange}>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          {isDirty && <button className="update-button" onClick={handleUpdateClick}>Update Status</button>}




          <div>
      <div>
        <button class="butto"  onClick={handleSumMessage}>Summaris with historical data</button>
      </div>
      {isMessageSummarised && (
  <div className='summary'>
    {content.split('\n').map((line, index) => (
      <div key={index}>{line}</div>
    ))}
  </div>
)}
    </div>
        </div>
        <div className="right-half">
            <Chatbot id={complaint._id}  />
        </div>

      </div>
    </div>
  );
}

export default ComplaintDetails;
