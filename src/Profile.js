import React, { useState, useContext } from 'react';
import { UserContext } from './App';
import JoblyApi from './JoblyApi';
import { Redirect } from 'react-router-dom';

function Profile() {

  const { user, setUser } = useContext(UserContext);
  const { username, first_name, last_name, email, photo_url } = user;
  const [message, setMessage] = useState(null);

  const handleUpdate = async (data) => {
    let res = await JoblyApi.update(user.username, data);
    if (res) {
      setUser(res.user);
    }
    return res;
  };

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    photo_url: "",
    password: ""
  });

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  };

  const gatherInput = async (evt) => {
    evt.preventDefault();

    let res = await handleUpdate({ formData });

    if (res.user) {
      setMessage(<div className="alert alert-success">Success!</div>);
    }
    else {
      setMessage(<div className="alert alert-danger">Unsuccessful</div>);
    }
  };

  if (!user.entries) {
    return <Redirect to='/login' />;
  };

  return (
    <div className="container col-md-6 offset-md-3">
      <form onSubmit={gatherInput}>
          <div className="form-group">
            <div className="font-weight-bold">
              Username
          </div>
            <div>
              {username}

            </div>
            <div>
              <label htmlFor="first_name" className="font-weight-bold d-flex justify-content-start">First Name</label>
              <input
                onChange={handleChange}
                type="text"
                name="first_name"
                value={formData.first_name}
                placeholder={first_name}
                id="first_name"
                className="form-control mx-auto"
              />
            </div>
            <div>
              <label htmlFor="last_name" className="font-weight-bold d-flex justify-content-start">Last Name</label>
              <input
                onChange={handleChange}
                type="text"
                name="last_name"
                value={formData.last_name}
                placeholder={last_name}
                id="last_name"
                className="form-control mx-auto"
              />
            </div>
            <div>
              <label htmlFor="email" className="font-weight-bold d-flex justify-content-start">Email</label>
              <input
                onChange={handleChange}
                type="text"
                name="email"
                value={formData.email}
                placeholder={email}
                id="email"
                className="form-control mx-auto"
              />
            </div>
            <div>
              <label htmlFor="photo_url" className="font-weight-bold d-flex justify-content-start">Photo URL</label>
              <input
                onChange={handleChange}
                type="text"
                name="photo_url"
                value={formData.photo_url}
                placeholder={photo_url}
                id="photo_url"
                className="form-control mx-auto"
              />
            </div>

            <div>
              <label htmlFor="password" className="font-weight-bold d-flex justify-content-start">Re-enter password</label>
              <input
                onChange={handleChange}
                type="password"
                name="password"
                value={formData.password}
                id="password"
                className="form-control mx-auto"
              />
            </div>

            {message ? message : null}
            
              <button className="btn btn-primary" id="submitButton">Submit</button>
            </div>
      </form>
        </div>
  )
}

export default Profile;

