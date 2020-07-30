import React, { useState, useContext } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import JoblyApi from './JoblyApi';
import { useHistory } from 'react-router-dom';
import { UserContext } from './App';


function Login({ handleLogin }) {
  const [loginForm, setLoginForm] = useState(true);
  const history = useHistory();
  const { setUser } = useContext(UserContext);

  async function login(data) {
    const resp = await JoblyApi.login(data);
    if (resp.token) {
      handleLogin(resp.token);
      let { user } = await JoblyApi.getUser(data.username);
      setUser(user);
      history.push("/");
    };
  };

  async function register(data) {
    const resp = await JoblyApi.register(data);
    if (resp.token) {
      handleLogin(resp.token);
      let user = await JoblyApi.getUser(data.username);
      setUser(user);
      history.push("/");
    };
  };

  return (
    <div class="container col-md-6 offset-md-3">
      <div class="d-flex justify-content-end">
        <div class="btn-group">
          <button onClick={() => setLoginForm(true)}
            class={`btn btn-primary ${loginForm ? "active" : ""}`}>Login</button>
          <button onClick={() => setLoginForm(false)}
            class={`btn btn-primary ${loginForm ? "" : "active"}`}>Register</button>
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          {loginForm ? <LoginForm login={login} /> : <RegisterForm register={register} />}
        </div>
      </div>
    </div>
  );
};

export default Login;

Login.defaultProps = {
  loggedIn: false
}