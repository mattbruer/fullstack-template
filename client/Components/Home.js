import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Home = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    !auth.id && navigate('/login');
  }, []);
  return <Container>Welcome, {auth.email?.split('@')[0]}</Container>;
};

export default Home;

const Container = styled.div`
  margin-top: 65px;
`;
