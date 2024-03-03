import React from 'react';
import UserBookings from './admindashboard/UserBookings'; // assuming the file name is UserBookings.js
import Revenue from './admindashboard/Revenue'; // assuming the file name is Revenue.js
import CarData from './admindashboard/Cardata'; // assuming the file name is CarData.js

function Dashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
        <div style={{ width: '50%' }}>
          <UserBookings />
        </div>
        <div style={{ width: '50%' }}>
          <Revenue />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
        <div style={{ width: '50%' }}>
          <CarData />
        </div>
        {/* Add the fourth graph component here */}
      </div>
    </div>
  );
}

export default Dashboard;
