import React from 'react';
import RevenueGraph from './Revenue';
import GraphComponent from './graph';

const Dashboard = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f0f0' }}>
      <div style={{ width: '40%', padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px', marginRight: '20px', background: '#ffffff' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>User Bookings Graph</h2>
        <GraphComponent />
      </div>
      <div style={{ width: '40%', padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px', background: '#ffffff' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Revenue Graph</h2>
        <RevenueGraph />
      </div>
    </div>
  );
};

export default Dashboard;
