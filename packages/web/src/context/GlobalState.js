import React, { createContext, useReducer, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppReducer from './AppReducer';

const BASE_URL = 'http://localhost:5000/api/v1/users';

const initialState = {
  users: [],
  selectedUser: null,
  status: 'iddle',
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const history = useHistory();

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers(offset = 0) {
    dispatch({ type: 'SET_STATUS', payload: 'fetching' });

    fetch(`${BASE_URL}?offset=${offset}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: 'GET_USERS', payload: data });
        dispatch({ type: 'SET_STATUS', payload: 'fetched' });
      })
      .catch((e) => {
        console.error(e);
        dispatch({ type: 'SET_STATUS', payload: 'fetched' });
      });
  }

  function selectUser(id) {
    dispatch({ type: 'SET_STATUS', payload: 'fetching' });

    fetch(`${BASE_URL}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: 'SELECT_USER', payload: data });
        dispatch({ type: 'SET_STATUS', payload: 'fetched' });
      })
      .catch((e) => {
        console.error(e);
        dispatch({ type: 'SET_STATUS', payload: 'fetched' });
      });
  }

  function addUser(user) {
    fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: 'ADD_USER', payload: data });
        dispatch({ type: 'SET_STATUS', payload: 'fetched' });
        history.push('/');
      })
      .catch((e) => {
        console.error(e);
        dispatch({ type: 'SET_STATUS', payload: 'fetched' });
      });
  }

  function editUser(id, user) {
    fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: 'EDIT_USER', payload: data });
        dispatch({ type: 'SELECT_USER', payload: null });
        dispatch({ type: 'SET_STATUS', payload: 'fetched' });
        history.push('/');
      })
      .catch((e) => {
        console.error(e);
        dispatch({ type: 'SET_STATUS', payload: 'fetched' });
      });
  }

  function removeUser(id) {
    fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
      .then(() => {
        dispatch({ type: 'REMOVE_USER', payload: id });
        dispatch({ type: 'SET_STATUS', payload: 'fetched' });
      })
      .catch((e) => {
        console.error(e);
        dispatch({ type: 'SET_STATUS', payload: 'fetched' });
      });
  }

  return (
    <GlobalContext.Provider
      value={{
        getUsers,
        selectUser,
        addUser,
        editUser,
        removeUser,
        ...state,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
