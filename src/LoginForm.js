import React, { useState } from 'react';

function LoginForm({ login }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState(null);

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  };

  const gatherInput = async (evt) => {
    evt.preventDefault();
    try {
      await login(formData);
    } catch {
      setMessage(<div className="alert alert-danger">Unsuccessful</div>);
    }
  };

  return (
    <div>
      <form onSubmit={gatherInput} >
        <div className="form-group">
          <label htmlFor="username" className="font-weight-bold d-flex justify-content-start">Username</label>
          <input
            onChange={handleChange}
            type="text"
            name="username"
            value={formData.username}
            id="username"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="font-weight-bold d-flex justify-content-start">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            id="password"
            value={formData.password}
            className="form-control"
          />
        </div>
        {message ? message : null}
        <div className="d-flex justify-content-end">
          <button id="submitButton" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;