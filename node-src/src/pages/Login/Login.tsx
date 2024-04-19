import React, { useState } from 'react';
import { Button, FormControl, FormGroup, TextField } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { useLoginMutation } from '../../services/api';

export const Login = () => {
  const [emailAddress, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useLoginMutation();

  const navigate = useNavigate({ from: '/login' });

  const handleSubmit = async (e: React.SyntheticEvent) => {
    login({ emailAddress, password });

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
            value={emailAddress}
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
