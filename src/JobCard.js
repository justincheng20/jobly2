import React, { useContext, useState } from 'react';
import JoblyApi from './JoblyApi';
import { UserContext } from './App';

function JobCard({ job, appliedStatus }) {
  const [applied, setApplied] = useState(appliedStatus);

  const { title, salary, equity, id } = { ...job };

  const { user } = useContext(UserContext);

  const handleApply = async (id) => {
    let res = await JoblyApi.apply(id, user.username)
    if (res.message === "applied") {
      setApplied(true);
    }
  };

  return (
    <div className="m-3 col-6 card mx-auto">
      <div className="card-body">
        <p className="d-flex justify-content-start"><b>{title}</b></p>
        <div className="d-flex justify-content-start">Salary: {salary}</div>
        <p className="d-flex justify-content-start">Equity: {equity}</p>
        <div className="d-flex justify-content-end">
          {applied ?
            <button type="button" disabled className="btn btn-danger" >Applied</button>
            :
            <button onClick={() => handleApply(id)} type="button" className="btn btn-danger">Apply</button>
          }
        </div>
      </div>
    </div>
  );
};

export default JobCard;