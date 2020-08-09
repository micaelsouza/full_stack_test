import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

import Hero from '../components/Hero';
import UserForm from '../components/UserForm';

export default () => {
  const { addUser } = useContext(GlobalContext);

  return (
    <>
      <Hero>
        <Link to="/" className="button is-light">
          Back to list
        </Link>
      </Hero>
      <div className="section">
        <div className="container">
          <UserForm onSubmit={addUser} />
        </div>
      </div>
    </>
  );
};
