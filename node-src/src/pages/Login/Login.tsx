import React, { useContext, useState } from 'react';
import { Button, FormControl, FormGroup, TextField } from '@mui/material';
import { login } from '../../services/userService';
import { AuthContext } from '../../context';

export const Login = () => {
  const [email, setEmail] = useState('emanual4real@hotmail.com');
  const [password, setPassword] = useState('Password123');

  const { setAuth } = useContext(AuthContext);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    const user = await login(email, password);
    setAuth({ loggedIn: true, user });

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
