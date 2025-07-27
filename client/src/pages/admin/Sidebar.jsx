import { NavLink } from 'react-router-dom'

function Sidebar() {
  const sidebarLinks = [
    { name: "Dashboard", path: '/admin/dashboard' },
    { name: "Add Room", path: '/admin/add-room' },
    { name: "List Rooms", path: '/admin/list-room' },
  ]

  return (
    <div className='md:w-64 w-16 border-r h-full border-gray-300 flex flex-col transition-all duration-300'>
      <div className='flex-1 flex flex-col pt-4'>
        {sidebarLinks.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            end="/admin"
            className={({ isActive }) => `
              flex items-center 
              py-3 px-4 md:px-6 
              transition-colors duration-200
              ${isActive
                ? 'border-r-4 md:border-r-[6px] bg-blue-600/10 border-blue-600 text-blue-600'
                : 'hover:bg-gray-100/90 border-white text-gray-700'
              }
            `}
          >
            <div className='w-5 h-5 bg-gray-300 rounded-md mr-3'></div>
            <span className={({ isActive }) => `${isActive ? 'font-medium' : 'font-normal'} hidden md:block`}>
              {item.name}
            </span>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default Sidebar