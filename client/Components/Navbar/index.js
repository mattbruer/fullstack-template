import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { logout } from '../../store';

const index = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const isLoggedIn = !!auth.id;

  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <Container>
      <Link to="/">Home</Link>
      {isLoggedIn && (
        <Link to="/login" onClick={handleClick}>
          Logout
        </Link>
      )}
    </Container>
  );
};

export default index;

const Container = styled.div`
  border-bottom: 1px solid grey;
  display: flex;
  height: 64px;
  position: fixed;
  top: 0px;
  width: 100%;
`;
