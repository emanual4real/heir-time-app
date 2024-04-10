import React, { useState } from 'react';
import { Button, FormControl, FormGroup, TextField } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { login } from '@ui/services';
import { useAuth } from '@ui/hooks';

export const Login = () => {
  const navigate = useNavigate({ from: '/login' });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setAuth } = useAuth();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    const res = await login(email, password);

    setAuth({ loggedIn: true, user: res });
    navigate({ to: '/' });
    e.preventDefault();
  };

  return (
    <div>
      <FormGroup>
        <FormControl>
          <TextField
            id="email"
            name="email"
            label="Email"
            value={email}
            helperText="Email address used to sign up"
            variant="filled"
            required
            onChange={(e) => setEmail(e.target.value)}></TextField>
        </FormControl>
        <FormControl>
          <TextField
            id="password"
            name="password"
            label="Password"
            value={password}
            variant="filled"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}></TextField>
        </FormControl>
      </FormGroup>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ float: 'right' }}
        onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};
