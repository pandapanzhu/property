import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PropertyMoney from './property-money';
import PropertyMoneyDetail from './property-money-detail';
import PropertyMoneyUpdate from './property-money-update';
import PropertyMoneyDeleteDialog from './property-money-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PropertyMoneyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PropertyMoneyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PropertyMoneyDetail} />
      <ErrorBoundaryRoute path={match.url} component={PropertyMoney} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PropertyMoneyDeleteDialog} />
  </>
);

export default Routes;
