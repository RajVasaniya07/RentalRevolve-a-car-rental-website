import React from 'react';

function SideMenu() {
  return (
    <div className="w-64 bg-gray-800 text-white">
      <div className="p-4">Logo / Branding</div>
      <ul className="py-2">
        <li className="px-4 py-2 hover:bg-gray-700">Dashboard</li>
        <li className="px-4 py-2 hover:bg-gray-700">User Management</li>
        {/* Add more menu items as needed */}
      </ul>
    </div>
  );
}

export default SideMenu;
