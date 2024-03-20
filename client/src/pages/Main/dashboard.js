import React from 'react';
import RevenueGraph from './Revenue';
import UserBookingsGraph from './graph';

const Dashboard = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f0f0', padding: '20px' }}>
      <div style={{ width: '50%', marginRight: '20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>User Bookings Graph</h2>
        <div style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '20px', background: '#fff' }}>
          <UserBookingsGraph />
        </div>
      </div>
      <div style={{ width: '50%' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Revenue Graph</h2>
        <div style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '20px', background: '#fff' }}>
          <RevenueGraph />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
