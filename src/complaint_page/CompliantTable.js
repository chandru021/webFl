import React,{useState} from 'react';
import './ComplaintTable.css';
import ComplaintDetails from './ComplaintDetail';
import axios from 'axios';

import { useEffect } from 'react';

function ComplaintsTable() {
    const [selectedComplaint, setSelectedComplaint] = useState(null);
  
    const complaints = [
      { num: 1, subject: "Late Delivery", description: "Package arrived late", remediation: "Refund 10%", date: "2024-04-23", status: "Resolved" },
      // Add more complaints as needed
    ];

    const [data, setData] = useState([]);
    // setData([])

    useEffect(() => {
        axios.get('http://localhost:8000/getComplaints')
            .then(response => {
                setData(response.data.entries);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []); // Empty array as second argument to run effect only once

  
    return (
      <div className="complaintsTable">
        <table>
          <thead>
            <tr>
              <th>Complaint Num</th>
              {/* <th>Subject</th> */}
              <th>Short Description</th>
              {/* <th>Remediation</th> */}
              <th>Date of Complaints</th>
              {/* <th>Status</th> */}
            </tr>
          </thead>
          <tbody>
            {data.map((complaint) => (
              <tr key={complaint.num} onClick={() => setSelectedComplaint(complaint)}>
                <td>{complaint._id}</td>
                {/* <td>{complaint.subject}</td> */}
                <td>{complaint.complaint.split("+").join(" ")}</td>
                {/* <td>{complaint.remediation}</td> */}
                <td>{complaint.regDate}</td>
                {/* <td>{complaint.status}</td> */}
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