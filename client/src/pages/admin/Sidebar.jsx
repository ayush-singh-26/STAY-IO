import React from 'react'
import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <div>
      <div>
        <div>
            <h1>Admin DashBoard</h1>
        </div>
        <ul>
            <li>
                <NavLink
                to="/admin/dashboard" 
                className={({ isActive }) => 
                  `flex items-center p-3 rounded-lg transition-colors ${isActive 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-gray-600 hover:bg-gray-100'}`
                }>
                    <span>DashBoard</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                to="/admin/hotels" 
                className={({ isActive }) => 
                  `flex items-center p-3 rounded-lg transition-colors ${isActive 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-gray-600 hover:bg-gray-100'}`
                }>
                    <span>Hotels</span>
                </NavLink>
            </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
