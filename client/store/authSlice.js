import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (formData, thunkAPI) => {
    try {
      const { data } = await axios.post('/auth/resetPassword', formData);
      return thunkAPI.dispatch(setAuth(data));
    } catch (error) {
      return thunkAPI.dispatch(setError('Password was not reset'));
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, thunkAPI) => {
    const { data } = await axios.post('/auth/forgotPassword', email);

    if (data === 'no user') {
      return thunkAPI.dispatch(
        setError('No user associated with this email.  Please try again.')
      );
    }
    return thunkAPI.dispatch(
      setError(
        'Check your email for a reset password link. You may close this page.'
      )
    );
  }
);

export const me = createAsyncThunk('auth/me', async (_, thunkAPI) => {
  const token = window.localStorage.getItem('token');

  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token,
      },
    });
    return thunkAPI.dispatch(setAuth(res.data));
  }
});

export const authenticate = createAsyncThunk(
  'auth/authenticate',
  async (formVals, thunkAPI) => {
    try {
      const { data } = await axios.post(`/auth/${formVals.formName}`, formVals);
      window.localStorage.setItem('token', data.token);
      thunkAPI.dispatch(me());
    } catch (authError) {
      return thunkAPI.dispatch(setError(authError.response.data));
    }
  }
);
const initialState = {
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      return { ...action.payload, error: null };
    },
    logout: () => {
      window.localStorage.removeItem('token');
      return initialState;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setAuth, logout, setError } = authSlice.actions;
export default authSlice.reducer;
