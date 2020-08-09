import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

import Hero from '../components/Hero';
import UsersList from '../components/UsersList';

export default (route) => {
  const {
    status, users, getUsers, removeUser,
  } = useContext(GlobalContext);

  function loadMoreUsers() {
    getUsers(users.length);
  }

  function redirectToUser(id) {
    route.history.push(`/view/${id}`);
  }

  function redirectToEditUser(id) {
    route.history.push(`/edit/${id}`);
  }

  function confirmAndDeleteUser(id) {
    /* eslint-disable-next-line no-alert */
    if (window.confirm('Do you really want delete this user?')) {
      removeUser(id);
    }
  }

  return (
    <>
      <Hero>
        <Link to="/add" className="button is-light">
          Add User
        </Link>
      </Hero>
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
            type="button"
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
