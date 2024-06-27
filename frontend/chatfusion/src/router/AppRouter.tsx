import * as React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Navigation from '../navigation';
import {ChatHomePage,LoginPage,SignupPage} from '../pages';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface IPrivateRouteProps{
  isAuthenticated:boolean,
  children:React.ReactNode
}


export const AppRouter: React.FunctionComponent = () => {
  const isAuthenticated = useSelector((state:RootState) => state.user.isAuthenticated)
  const PrivateRoute = () => {
    return isAuthenticated ? <ChatHomePage/> : <Navigate to="/login" />;
  };
  console.log('Fetched the react redux store and found isAuthenticated as:', isAuthenticated)
  return (
    <BrowserRouter>
        {isAuthenticated?<Navigation/>:<></>}
        <Routes>
          <Route path='/' element={<PrivateRoute/>}/>
          <Route path='/signup' element={<SignupPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
        </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;