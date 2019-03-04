import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Stuff from './stuff';
import PropertyMoney from './property-money';
import PropertyServe from './property-serve';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/stuff`} component={Stuff} />
      <ErrorBoundaryRoute path={`${match.url}/property-money`} component={PropertyMoney} />
      <ErrorBoundaryRoute path={`${match.url}/property-serve`} component={PropertyServe} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
