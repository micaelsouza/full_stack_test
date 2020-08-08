import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

import UserForm from '../components/UserForm';

const Hero = ({ user }) => (
  <section className="hero is-info">
    <div className="hero-body">
      <div className="container">
        <div className="level">
          <div className="level-left">
            <h1 className="title">Edit User</h1>
          </div>
          <div className="level-right">
            <Link to="/" className="button is-light">
              Back to list
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

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
      <Hero />
      <div className="section">
        <div className="container">
          <UserForm user={selectedUser} onSubmit={submitForm} submitMessage="Save user" />
        </div>
      </div>
    </>
  );
};
