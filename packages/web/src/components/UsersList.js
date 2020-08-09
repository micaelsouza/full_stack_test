/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const UserList = ({
  users, onRemoveUser, onEditUser, onSelect,
}) => {
  if (users.length === 0) return <div className="notification is-info">Users list is empty</div>;

  return (
    <table className="table is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>Name</th>
          <th>CPF</th>
          <th>E-mail</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(({
          id, name, cpf, email, phonenumber,
        }) => (
          <tr key={id}>
            <td>{name}</td>
            <td>{cpf}</td>
            <td>{email}</td>
            <td>{phonenumber}</td>
            <td>
              <div className="buttons are-small">
                <button type="button" className="button is-primary" onClick={() => onSelect(id)}>
                  View
                </button>
                <button type="button" className="button" onClick={() => onEditUser(id)}>
                  Edit
                </button>
                <button type="button" className="button is-danger" onClick={() => onRemoveUser(id)}>
                  Remove
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// users, onRemoveUser, onEditUser, onSelect,

UserList.propTypes = {
  users: PropTypes.array,
  onRemoveUser: PropTypes.func,
  onEditUser: PropTypes.func,
  onSelect: PropTypes.func,
};

UserList.defaultProps = {
  users: [],
  onRemoveUser: null,
  onEditUser: null,
  onSelect: null,
};

export default UserList;
