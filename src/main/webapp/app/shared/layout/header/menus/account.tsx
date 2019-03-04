import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';

import { NavDropdown } from '../header-components';

const accountMenuItemsAuthenticated = (
  <>
    <DropdownItem tag={Link} to="/account/settings">
      <FontAwesomeIcon icon="wrench" /> 设置
    </DropdownItem>
    <DropdownItem tag={Link} to="/account/password">
      <FontAwesomeIcon icon="clock" /> 密码
    </DropdownItem>
    <DropdownItem tag={Link} to="/logout">
      <FontAwesomeIcon icon="sign-out-alt" /> 注销
    </DropdownItem>
  </>
);

const accountMenuItems = (
  <>
    <DropdownItem id="login-item" tag={Link} to="/login">
      <FontAwesomeIcon icon="sign-in-alt" /> 登录
    </DropdownItem>
    <DropdownItem tag={Link} to="/register">
      <FontAwesomeIcon icon="sign-in-alt" /> 注册
    </DropdownItem>
  </>
);

export const AccountMenu = ({ isAuthenticated = false }) => (
  <NavDropdown icon="user" name="账号设置" id="account-menu">
    {isAuthenticated ? accountMenuItemsAuthenticated : accountMenuItems}
  </NavDropdown>
);

export default AccountMenu;
