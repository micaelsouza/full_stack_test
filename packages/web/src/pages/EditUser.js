import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

import Hero from '../components/Hero';
import UserForm from '../components/UserForm';

export default (route) => {
  const { selectedUser, selectUser, editUser } = useContext(GlobalContext);

  useEffect(() => {
    selectUser(route.match.params.id);
  }, []);

  function submitForm(user) {
    editUser(selectedUser.id, user);
  }

  return (
    <>
      <Hero>
        <Link to="/" className="button is-light">
          Back to list
        </Link>
      </Hero>
      <div className="section">
        <div className="container">
          <UserForm user={selectedUser} onSubmit={submitForm} submitMessage="Save user" />
        </div>
      </div>
    </>
  );
};
