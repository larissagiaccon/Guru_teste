import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { SignUp } from 'pages/SignUp';
import { Dashboard } from 'pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/atualizar/:id" component={SignUp} />

    <Route path="/cadastro" component={SignUp} />

    <Route path="/" exact component={Dashboard} />
  </Switch>
);

export default Routes;
