import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

import UserForm from '../components/UserForm';

const Hero = ({ userId }) => (
  <section className="hero is-info">
    <div className="hero-body">
      <div className="container">
        <div className="level">
          <div className="level-left">
            <h1 className="title">User Details</h1>
          </div>
          <div className="level-right">
            <div className="buttons">
              <Link to={`/edit/${userId}`} className="button is-primary">
                Edit
              </Link>
              <Link to="/" className="button is-light">
                Back to list
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default (route) => {
  const { selectedUser, selectUser } = useContext(GlobalContext);

  useEffect(() => {
    selectUser(route.match.params.id);
  }, []);

  return (
    <>
      <Hero userId={route.match.params.id} />
      <div className="section">
        <div className="container">
          <UserForm user={selectedUser} disabled />
        </div>
      </div>
    </>
  );
};
