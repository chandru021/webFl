import React , {useState} from 'react';
import Header from './complaint_page/Header';
import Sidebar from './complaint_page/SideBar';
import ComplaintsTable from './complaint_page/CompliantTable';
import './complaint_page/App.css';

function App() {
  const [activeTab, setActiveTab] = useState('complaint');

  return (
    <div className="App">
      <Header />
      <div className="container">
        <Sidebar active={activeTab} setActive={setActiveTab} />
        <div>
          {activeTab === 'complaint' && <ComplaintsTable />}
          {activeTab === 'heatmap' && <div>Heat Map Content Here</div>}
          {activeTab === 'profile' && <div>Profile Content Here</div>}
        </div>
      </div>
    </div>
  );
}


export default App;