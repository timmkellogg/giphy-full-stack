import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from './ProvideAuth';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();

    let { from } = location.state || { from: { pathname: "/" } };
    let login = () => {
        auth.signin(username, password).then(() => {
            history.replace(from);
        }).catch((err) => {
            console.log(err);
        })
    };

    return (
        <div>
            <input placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
            <input placeholder='password' value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={login}>Log in</button>
        </div>
    );
}

export default LoginPage;