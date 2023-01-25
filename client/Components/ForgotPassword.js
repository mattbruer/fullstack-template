import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../store';
import { useDispatch, useSelector } from 'react-redux';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [password, setPassword] = useState({
    newPassword: '',
    confirm: '',
  });

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    !!auth.id && navigate('/');
  }, [auth]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.newPassword === password.confirm) {
      dispatch(
        resetPassword({
          newPassword: password.newPassword,
          token: params.token,
        })
      );
    }
  };

  const handleChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };
  return (
    <Container>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          height: '200px',
        }}
        onSubmit={handleSubmit}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <label htmlFor="newPassword">New Password:</label>
          <input onChange={handleChange} name="newPassword" type="password" />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <label htmlFor="confirm">Confirm New Password:</label>
          <input onChange={handleChange} name="confirm" type="password" />
        </div>

        <button type="submit">reset password</button>
      </form>
    </Container>
  );
};

export default ForgotPassword;
const Container = styled.div`
  margin-top: 65px;
  height: calc(100vh - 65px);
  display: flex;
  align-items: center;
  justify-content: center;
`;
