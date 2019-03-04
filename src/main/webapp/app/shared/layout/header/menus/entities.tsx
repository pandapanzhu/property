import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name="Entities" id="entity-menu">
    <DropdownItem tag={Link} to="/entity/stuff">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;Stuff
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/property-money">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;Property Money
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/property-serve">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;Property Serve
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
