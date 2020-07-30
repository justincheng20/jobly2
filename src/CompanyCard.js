import React from 'react';
import { Link } from "react-router-dom";

function CompanyCard({ company }) {
  const { name, description, handle } = { ...company };
  return (
    <div className="m-3 col-8 card mx-auto">
      <Link to={`/companies/${handle}`} >
        <div className="card-body">
          <div className="card-title font-weight-bold d-flex justify-content-start text-body" >{name}</div>
          <p className="text-left text-body">{description}</p>
        </div>
      </Link>
    </div>
  );
};

export default CompanyCard;