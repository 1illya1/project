import logo from './logo.svg';
import './App.css';
import {Route, BrowserRouter, Routes, useNavigate , Navigate} from 'react-router-dom'
import ReservCar from './pages/ReservCar';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import UserReservs from './pages/UserReservs'
import AddCar from './pages/AddCar'
import AdminHome from './pages/AdminHome'
import EditCar from './pages/EditCar';




function App() {
 
  return (
    <div className="App">
  
  <BrowserRouter>
    <Routes>
     <Route path={'/'} element={<RequireAuth redirectTo="/login"><Home/></RequireAuth>}/>
     <Route path={'/login'} element={<Login/>}/>
     <Route path={'/register'} element={<Register/>}/>
     <Route path={'/reservcar/:carid'} element={<RequireAuth redirectTo="/login"><ReservCar/></RequireAuth>}/>
     <Route path={'/userreservs'} element={<RequireAuth redirectTo="/login"><UserReservs/></RequireAuth>}/>
     <Route path={'/addcar'} element={<RequireAuth redirectTo="/login"><AddCar/></RequireAuth>}/>
     <Route path={'/admin'} element={<RequireAuth redirectTo="/login"><AdminHome/></RequireAuth>}/>
     <Route path={'/editcar/:carid'} element={<RequireAuth redirectTo="/login"><EditCar/></RequireAuth>}/>
    </Routes>
  </BrowserRouter>

    </div>
  );
}
function RequireAuth({ children, redirectTo }) {
  return localStorage.getItem('user') ? children : <Navigate to={redirectTo} />;
}

export default App;



