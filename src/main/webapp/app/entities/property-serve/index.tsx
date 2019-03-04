import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PropertyServe from './property-serve';
import PropertyServeDetail from './property-serve-detail';
import PropertyServeUpdate from './property-serve-update';
import PropertyServeDeleteDialog from './property-serve-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PropertyServeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PropertyServeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PropertyServeDetail} />
      <ErrorBoundaryRoute path={match.url} component={PropertyServe} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PropertyServeDeleteDialog} />
  </>
);

export default Routes;
