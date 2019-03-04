import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Stuff from './stuff';
import StuffDetail from './stuff-detail';
import StuffUpdate from './stuff-update';
import StuffDeleteDialog from './stuff-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={StuffUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={StuffUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={StuffDetail} />
      <ErrorBoundaryRoute path={match.url} component={Stuff} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={StuffDeleteDialog} />
  </>
);

export default Routes;
