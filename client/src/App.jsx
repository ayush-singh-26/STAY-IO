import { Outlet } from 'react-router-dom';
import Footers from './components/Footers';
import Navbar from './components/Navbar';
import { Bounce, ToastContainer } from 'react-toastify';
import './index.css'

function App() {

  return (
    <div>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce} />
      <Navbar />
      <Outlet />
      <Footers />
    </div>
  )
}

export default App

