import React,{useState} from 'react';
import './ComplaintTable.css';
import ComplaintDetails from './ComplaintDetail';

function ComplaintsTable() {
    const [selectedComplaint, setSelectedComplaint] = useState(null);
  
    const complaints = [
      { num: 1, subject: "Late Delivery", description: "Package arrived late", remediation: "Refund 10%", date: "2024-04-23", status: "Resolved" },
      // Add more complaints as needed
    ];
  
    return (
      <div className="complaintsTable">
        <table>
          <thead>
            <tr>
              <th>Complaint Num</th>
              <th>Subject</th>
              <th>Short Description</th>
              <th>Remediation</th>
              <th>Date of Complaints</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint.num} onClick={() => setSelectedComplaint(complaint)}>
                <td>{complaint.num}</td>
                <td>{complaint.subject}</td>
                <td>{complaint.description}</td>
                <td>{complaint.remediation}</td>
                <td>{complaint.date}</td>
                <td>{complaint.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedComplaint && (
          <ComplaintDetails
            complaint={selectedComplaint}
            onClose={() => setSelectedComplaint(null)}
          />
        )}
      </div>
    );
  }
  
  
export default ComplaintsTable;