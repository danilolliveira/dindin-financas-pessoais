import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import App from "./App";
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from "./pages/register/register";
import { getItem } from "./utils/storage";


function PrivateRoute({ redirectTo }) {
    let isAuthenticated = getItem('token')
    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}

export default function RoutesElement() {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route element={<PrivateRoute redirectTo={'/'} />}>
                <Route path="/home" element={<App />}>
                    <Route path="" element={<Home />} />
                </Route>
            </Route>
        </Routes>
    )
}