import React from 'react';
import SideMenu from './SideMenu'; // Assuming you have a component for the side menu
import UserBookings from './admindashboard/UserBookings';
import Revenue from './admindashboard/Revenue';
import CarData from './admindashboard/Cardata';
import UsersData from './admindashboard/Usersdata';

function Dashboard() {
  return (
    <div className="flex h-screen">
      <SideMenu />

      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-between px-8 py-4 bg-gray-100">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          {/* You can add any additional header elements here */}
        </div>

        {/* First Row */}
        <div className="flex flex-row justify-between mt-8">
          <div className="w-1/2 px-4">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <UserBookings />
            </div>
          </div>
          <div className="w-1/2 px-4">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <Revenue />
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="flex flex-row justify-between mt-8">
          <div className="w-1/2 px-4">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <CarData />
            </div>
          </div>
          <div className="w-1/2 px-4">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <UsersData />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
