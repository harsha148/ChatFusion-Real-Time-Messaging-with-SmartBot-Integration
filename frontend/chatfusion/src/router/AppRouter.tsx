import * as React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {LoginPage,SignupPage} from '../pages';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import HomePage from '../pages/HomePage';

interface IPrivateRouteProps{
  isAuthenticated:boolean,
  children:React.ReactNode
}


export const AppRouter: React.FunctionComponent = () => {
  const isAuthenticated = useSelector((state:RootState) => state.user.isAuthenticated)
  const PrivateRoute = () => {
    return isAuthenticated ? <HomePage/> : <Navigate to="/login" />;
  };
  console.log('Fetched the react redux store and found isAuthenticated as:', isAuthenticated)
  return (
    <BrowserRouter>
        {/* {isAuthenticated?<Navigation/>:<></>} */}
        <Routes>
          <Route path='/' element={<PrivateRoute/>}/>
          <Route path='/signup' element={<SignupPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
        </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;