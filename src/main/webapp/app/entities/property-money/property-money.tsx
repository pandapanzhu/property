import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, getPaginationItemsNumber, JhiPagination } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './property-money.reducer';
import { IPropertyMoney } from 'app/shared/model/property-money.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IPropertyMoneyProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IPropertyMoneyState = IPaginationBaseState;

export class PropertyMoney extends React.Component<IPropertyMoneyProps, IPropertyMoneyState> {
  state: IPropertyMoneyState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
  }

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { propertyMoneyList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="property-money-heading">
          Property Monies
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Property Money
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={this.sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('address')}>
                  Address <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('should')}>
                  Should <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('isPay')}>
                  Is Pay <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('year')}>
                  Year <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('month')}>
                  Month <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('remark')}>
                  Remark <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('dlt')}>
                  Dlt <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('createdBy')}>
                  Created By <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('createdDate')}>
                  Created Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('lastModifiedBy')}>
                  Last Modified By <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('lastModifiedDate')}>
                  Last Modified Date <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {propertyMoneyList.map((propertyMoney, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${propertyMoney.id}`} color="link" size="sm">
                      {propertyMoney.id}
                    </Button>
                  </td>
                  <td>{propertyMoney.address}</td>
                  <td>{propertyMoney.should}</td>
                  <td>{propertyMoney.isPay ? 'true' : 'false'}</td>
                  <td>{propertyMoney.year}</td>
                  <td>{propertyMoney.month}</td>
                  <td>{propertyMoney.remark}</td>
                  <td>{propertyMoney.dlt}</td>
                  <td>{propertyMoney.createdBy}</td>
                  <td>
                    <TextFormat type="date" value={propertyMoney.createdDate} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{propertyMoney.lastModifiedBy}</td>
                  <td>
                    <TextFormat type="date" value={propertyMoney.lastModifiedDate} format={APP_DATE_FORMAT} />
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${propertyMoney.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${propertyMoney.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${propertyMoney.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Row className="justify-content-center">
          <JhiPagination
            items={getPaginationItemsNumber(totalItems, this.state.itemsPerPage)}
            activePage={this.state.activePage}
            onSelect={this.handlePagination}
            maxButtons={5}
          />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ propertyMoney }: IRootState) => ({
  propertyMoneyList: propertyMoney.entities,
  totalItems: propertyMoney.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyMoney);
