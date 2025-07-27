import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

function Admin_Panel() {
  return (
    <div className='flex flex-col h-screen'>
      <div className='flex h-full'>
        <Sidebar/>
        <div className='flex-1 p-4 md:px-10 h-full'>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Admin_Panel
