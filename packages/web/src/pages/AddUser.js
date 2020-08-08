import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

import UserForm from '../components/UserForm';

const Hero = () => (
  <section className="hero is-info">
    <div className="hero-body">
      <div className="container">
        <div className="level">
          <div className="level-left">
            <h1 className="title">New User</h1>
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

export default () => {
  const { addUser } = useContext(GlobalContext);

  return (
    <>
      <Hero />
      <div className="section">
        <div className="container">
          <UserForm onSubmit={addUser} />
        </div>
      </div>
    </>
  );
};
