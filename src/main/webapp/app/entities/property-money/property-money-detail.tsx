import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './property-money.reducer';
import { IPropertyMoney } from 'app/shared/model/property-money.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPropertyMoneyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PropertyMoneyDetail extends React.Component<IPropertyMoneyDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { propertyMoneyEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            PropertyMoney [<b>{propertyMoneyEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="address">Address</span>
            </dt>
            <dd>{propertyMoneyEntity.address}</dd>
            <dt>
              <span id="should">Should</span>
            </dt>
            <dd>{propertyMoneyEntity.should}</dd>
            <dt>
              <span id="isPay">Is Pay</span>
            </dt>
            <dd>{propertyMoneyEntity.isPay ? 'true' : 'false'}</dd>
            <dt>
              <span id="year">Year</span>
            </dt>
            <dd>{propertyMoneyEntity.year}</dd>
            <dt>
              <span id="month">Month</span>
            </dt>
            <dd>{propertyMoneyEntity.month}</dd>
            <dt>
              <span id="remark">Remark</span>
            </dt>
            <dd>{propertyMoneyEntity.remark}</dd>
            <dt>
              <span id="dlt">Dlt</span>
            </dt>
            <dd>{propertyMoneyEntity.dlt}</dd>
            <dt>
              <span id="createdBy">Created By</span>
            </dt>
            <dd>{propertyMoneyEntity.createdBy}</dd>
            <dt>
              <span id="createdDate">Created Date</span>
            </dt>
            <dd>
              <TextFormat value={propertyMoneyEntity.createdDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="lastModifiedBy">Last Modified By</span>
            </dt>
            <dd>{propertyMoneyEntity.lastModifiedBy}</dd>
            <dt>
              <span id="lastModifiedDate">Last Modified Date</span>
            </dt>
            <dd>
              <TextFormat value={propertyMoneyEntity.lastModifiedDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
          </dl>
          <Button tag={Link} to="/entity/property-money" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/property-money/${propertyMoneyEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ propertyMoney }: IRootState) => ({
  propertyMoneyEntity: propertyMoney.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyMoneyDetail);
