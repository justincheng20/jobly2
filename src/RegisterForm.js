import React, { useState } from 'react';

// Define goToHome function in Login.js later

function RegisterForm({ register }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    photo_url: "",
    email: "",
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
      await register(formData);
    } catch {
      setMessage(<div className="alert alert-danger">Unsuccessful</div>);
    }
  };

  return (
    <div>
      <form onSubmit={gatherInput}>
        <div className="form-group">
          <label htmlFor="username" className="font-weight-bold d-flex justify-content-start">
            Username
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="username"
            value={formData.username}
            id="username"
            className="form-control mx-auto"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="font-weight-bold d-flex justify-content-start">
            Password
          </label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            id="password"
            value={formData.password}
            className="form-control mx-auto"
          />
        </div>
        <div className="form-group">
          <label htmlFor="first_name" className="font-weight-bold d-flex justify-content-start">
            First Name
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="firstName"
            value={formData.firstName}
            id="first_name"
            className="form-control mx-auto"
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name" className="font-weight-bold d-flex justify-content-start">
            Last Name
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="lastName"
            value={formData.last_name}
            id="last_name"
            className="form-control mx-auto"
          />
        </div>
        <div className="form-group">
          <label htmlFor="photo_url" className="font-weight-bold d-flex justify-content-start">
            Photo URL (Optional)
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="photo_url"
            value={formData.photo_url}
            id="photo_url"
            className="form-control mx-auto"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="font-weight-bold d-flex justify-content-start">
            Email
            </label>
          <input
            onChange={handleChange}
            type="text"
            name="email"
            value={formData.email}
            id="email"
            className="form-control mx-auto"
          />
        </div>
        {message ? message : null}
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary" id="submitButton">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;