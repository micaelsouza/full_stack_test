import React, { useContext } from 'react';

import { GlobalContext } from '../context/GlobalState';

export default ({
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
                <button className="button is-primary" onClick={() => onSelect(id)}>
                  View
                </button>
                <button className="button" onClick={() => onEditUser(id)}>
                  Edit
                </button>
                <button className="button is-danger" onClick={() => onRemoveUser(id)}>
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
