import { useState } from 'react';
import axios from 'axios';

function useProvideAuth() {
    const [user, setUser] = useState(null);
  
    const signin = (username, password) => {
      return axios.post('auth/login', { username, password }).then((res) => {
        setUser(res.data.accessToken);
      })
    };
  
    const signout = () => {
      return axios.post('auth/logout', {token: user }).then(() => {
        setUser(null);
      })
    };

    const authHeader = () => {
      return { Authorization: `Bearer ${user}`}
    }
  
    return {
      user,
      signin,
      signout,
      authHeader
    };
  }

  export default useProvideAuth;