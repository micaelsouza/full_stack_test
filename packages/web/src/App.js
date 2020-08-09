import 'bulma';
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import ViewUser from './pages/ViewUser';

import { GlobalProvider } from './context/GlobalState';

export default () => (
  <GlobalProvider>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/view/:id" component={ViewUser} exact />
      <Route path="/add" component={AddUser} exact />
      <Route path="/edit/:id" component={EditUser} exact />
    </Switch>
  </GlobalProvider>
);
