import React, { useState, useEffect, useContext } from 'react';
import JoblyApi from './JoblyApi';
import CompanyCard from './CompanyCard';
import CompanySearchForm from './CompanySearchForm';
import { UserContext } from './App';
import { Redirect } from 'react-router-dom';

function Companies() {
  const [companies, setCompanies] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user.username) {
      async function fetchCompanies() {
        const companiesResult = await JoblyApi.getCompanies();
        setCompanies(companiesResult);
      };
      fetchCompanies();
    }
  }, [user]);

  async function searchCompanies({ searchTerm }) {
    let data = { search: searchTerm };
    const companiesResult = await JoblyApi.getCompanies(data);
    setCompanies(companiesResult);
  };

  if (!user.username) {
    return <Redirect to='/login' />;
  };

  return (
    <div>
      <CompanySearchForm searchCompanies={searchCompanies} />
      {companies.length ?
        companies.map(company =>
          <CompanyCard company={company} key={company.handle} />
        )
        : "No results found"}
    </div>
  )
};

export default Companies;