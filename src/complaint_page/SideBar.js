import React, { useState } from 'react';
import './Sidebar.css';

function Sidebar() {
  const [active, setActive] = useState('complaint');

  return (
    <div className="sidebar">
      <button
        className={`sidebar-button ${active === 'complaint' ? 'active' : ''}`}
        onClick={() => setActive('complaint')}
      >
        Complaint
      </button>
      <button
        className={`sidebar-button ${active === 'heatmap' ? 'active' : ''}`}
        onClick={() => setActive('heatmap')}
      >
        Heat Map
      </button>
      <button
        className={`sidebar-button ${active === 'profile' ? 'active' : ''}`}
        onClick={() => setActive('profile')}
      >
        Profile
      </button>
    </div>
  );
}

export default Sidebar;