import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes as AppRoutes, Route } from 'react-router-dom';
import Home from './Components/Home';
import { Login, Signup } from './Components/AuthForm';
import ForgotPassword from './Components/ForgotPassword';

const Routes = () => {
  return (
    <AppRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password/:token" element={<ForgotPassword />} />
    </AppRoutes>
  );
};

export default Routes;
