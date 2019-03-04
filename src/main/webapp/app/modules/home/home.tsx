import './home.css';

import React from 'react';
// import { Link } from 'react-router-dom';
import { NavLink as Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  NavItem,
  NavLink,
  NavbarBrand,
  DropdownItem,
  Row,
  Col,
  Alert,
  Button
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export interface IHomeProp extends StateProps, DispatchProps {}

export const NavDropdown = props => (
  <UncontrolledDropdown inNavbar id={props.id}>
    <DropdownMenu className="show">{props.children}</DropdownMenu>
  </UncontrolledDropdown>
);

export class Home extends React.Component<IHomeProp> {
  componentDidMount() {
    this.props.getSession();
  }

  render() {
    const { account } = this.props;
    return (
      <Row>
        <Col xs="9">
          <h2 className="welcome">
            {' '}
            <div className="loginName">欢迎您, </div>
            {account && account.login ? (
              <div className="loginName">
                <Link to="entity/stuff" className="btn btn-light float-right jh-create-entity">
                  {account.login}
                </Link>
              </div>
            ) : (
              <div className="loginName">
                <Link to="/login" className="alert-link">
                  {' '}
                  请先登录
                </Link>
              </div>
            )}
          </h2>
        </Col>

        {/*头部结束*/}
        <Col xs="12">
          <div className="selfHome">
            {account && account.login ? (
              <NavDropdown divider>
                <DropdownItem id="login-item" tag={Link} to="/entity/property-serve">
                  <div className="name"> 我的订单 </div> <div className="font"> > </div>
                </DropdownItem>
                <DropdownItem tag={Link} to="/entity/property-money">
                  <div className="name"> 我的服务 </div> <div className="font"> > </div>
                </DropdownItem>
              </NavDropdown>
            ) : null}
          </div>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
