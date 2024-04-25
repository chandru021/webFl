import React from 'react';
import './ComplaintDetail.css';

function ComplaintDetails({ complaint, onClose }) {
  return (
    <div className="complaint-details">
      <div className="complaint-details-backdrop" onClick={onClose}></div>
      <div className="complaint-details-content">
        <div className="left-half">
          <h2>Complaint Details</h2>
          <p><strong>Number:</strong> {complaint.num}</p>
          <p><strong>Subject:</strong> {complaint.subject}</p>
          <p><strong>Description:</strong> {complaint.description}</p>
          <p><strong>Remediation:</strong> {complaint.remediation}</p>
          <p><strong>Date:</strong> {complaint.date}</p>
          <p><strong>Status:</strong> {complaint.status}</p>
        </div>
        <div className="right-half">
          {/* Right half can be used for other details or actions */}
        </div>
      </div>
    </div>
  );
}

export default ComplaintDetails;
