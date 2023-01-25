import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Routes from './Routes';
import Navbar from './Components/Navbar';
import { me } from './store';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
