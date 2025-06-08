import React from 'react'
import { NavLink } from 'react-router-dom'

function Admin_Panel() {
  return (
    <div>
      <div>
        <NavLink
              to="add-hotel"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                  ? 'text-indigo-700 bg-indigo-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`
              }
            >
              Add Hotel
            </NavLink>
        <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                  ? 'text-indigo-700 bg-indigo-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`
              }
            >
              Edit Hotel
            </NavLink>
        <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                  ? 'text-indigo-700 bg-indigo-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`
              }
            >
              
            </NavLink>
      </div>
    </div>
  )
}

export default Admin_Panel
