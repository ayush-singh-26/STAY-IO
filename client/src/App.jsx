import { Outlet } from 'react-router-dom';
import Footers from './components/Footers';
import Navbar from './components/Navbar';


function App() {
  
  return (
    <div className='bg-gray-800'>
      <Navbar />
      <Outlet />
      <Footers />
    </div>
  )
}

export default App

