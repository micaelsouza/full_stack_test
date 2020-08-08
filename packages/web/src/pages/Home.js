import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

import UsersList from '../components/UsersList';

const Hero = () => (
  <section className="hero is-info">
    <div className="hero-body">
      <div className="container">
        <div className="level">
          <div className="level-left">
            <h1 className="title">Users</h1>
          </div>
          <div className="level-right">
            <Link className="button is-light" to="/add">
              Add user
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ({ history }) => {
  const {
    status, users, getUsers, removeUser,
  } = useContext(GlobalContext);

  function loadMoreUsers() {
    getUsers(users.length);
  }

  function redirectToUser(id) {
    history.push(`/view/${id}`);
  }

  function redirectToEditUser(id) {
    history.push(`/edit/${id}`);
  }

  function confirmAndDeleteUser(id) {
    if (confirm('Do you really want delete this user?')) {
      removeUser(id);
    }
  }

  return (
    <>
      <Hero />
      <div className="section">
        <div className="container">
          {users.length === 0 && status === 'fetching' ? (
            <div className="notification is-info">Loading...</div>
          ) : (
            <UsersList
              users={users}
              onEditUser={redirectToEditUser}
              onRemoveUser={confirmAndDeleteUser}
              onSelect={redirectToUser}
            />
          )}

          <button
            className={`button is-primary ${status === 'fetching' ? 'is-loading is-disabled' : ''}`}
            onClick={loadMoreUsers}
          >
            Load More
          </button>
        </div>
      </div>
    </>
  );
};
