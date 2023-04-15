import React, { useState } from 'react'

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        const dummyUser = { username: 'admin', password: 'password123' };
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.username === username && user.password === password) {
            localStorage.setItem('isLoggedIn', true);
            window.location.reload();
        } else if (username === dummyUser.username && password === dummyUser.password) {
            localStorage.setItem('user', JSON.stringify(dummyUser));
            localStorage.setItem('isLoggedIn', true);
            window.location.reload();
        } else {
            setErrorMessage('Invalid username or password');
        }
    };
    return (
        <div className='container'>
            <h2 className='mt-5 mb-5'>Login</h2>
            <form onSubmit={handleLogin}>
                <div class="form-outline mb-4">
                    <input
                        type="text"
                        id="username"
                        className='form-control'
                        value={username}
                        placeholder="Username"
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <label class="form-label" for="form2Example1">Username</label>
                </div>

                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input
                        type="password"
                        id="password"
                        class="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <button type="submit" class="btn btn-primary mt-3">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login