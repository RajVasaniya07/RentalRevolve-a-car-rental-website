import React from 'react';
import UserBookings from './admindashboard/UserBookings';
import Revenue from './admindashboard/Revenue';
import CarData from './admindashboard/Cardata';
import UsersData from './admindashboard/Usersdata';

function Dashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* First Row */}
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
        <div style={{ width: '50%' }}>
          <UserBookings />
        </div>
        <div style={{ width: '45%' }}>
          <Revenue />
        </div>
      </div>
      {/* Second Row */}
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
        <div style={{ width: '50%' }}>
          <CarData />
        </div>
        <div style={{ width: '45%' }}>
          <UsersData />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
