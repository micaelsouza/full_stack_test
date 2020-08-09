import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

import Hero from '../components/Hero';
import UserForm from '../components/UserForm';

export default (route) => {
  const { selectedUser, selectUser } = useContext(GlobalContext);

  useEffect(() => {
    selectUser(route.match.params.id);
  }, []);

  return (
    <>
      <Hero>
        <Link to={`/edit/${route.match.params.id}`} className="button is-primary">
          Edit
        </Link>

        <Link to="/" className="button is-light">
          Back to list
        </Link>
      </Hero>
      <div className="section">
        <div className="container">
          <UserForm user={selectedUser} disabled />
        </div>
      </div>
    </>
  );
};
