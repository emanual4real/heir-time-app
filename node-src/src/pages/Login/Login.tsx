import React, { useState } from 'react';
import { Button, FormControl, FormGroup, TextField } from '@mui/material';
import { login } from '../../services/userService';

export const Login = () => {
  const FORM_ENDPOINT = 'http://localhost:8080/api/User/authenticate';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.SyntheticEvent) => {
    login(email, password);

    e.preventDefault();
  };

  return (
    <div>
      <h1>{email}</h1>
      <h1>{password}</h1>
      <form onSubmit={handleSubmit}>
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
        <Button type="submit" variant="contained" color="primary" style={{ float: 'right' }}>
          Submit
        </Button>
      </form>
    </div>
  );
};
