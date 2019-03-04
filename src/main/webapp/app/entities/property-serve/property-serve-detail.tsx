import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './property-serve.reducer';
import { IPropertyServe } from 'app/shared/model/property-serve.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPropertyServeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PropertyServeDetail extends React.Component<IPropertyServeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { propertyServeEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            PropertyServe [<b>{propertyServeEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="userId">User Id</span>
            </dt>
            <dd>{propertyServeEntity.userId}</dd>
            <dt>
              <span id="reason">Reason</span>
            </dt>
            <dd>{propertyServeEntity.reason}</dd>
            <dt>
              <span id="type">Type</span>
            </dt>
            <dd>{propertyServeEntity.type}</dd>
            <dt>
              <span id="remark">Remark</span>
            </dt>
            <dd>{propertyServeEntity.remark}</dd>
            <dt>
              <span id="dlt">Dlt</span>
            </dt>
            <dd>{propertyServeEntity.dlt}</dd>
            <dt>
              <span id="create_user">Create User</span>
            </dt>
            <dd>{propertyServeEntity.create_user}</dd>
            <dt>
              <span id="createDate">Create Date</span>
            </dt>
            <dd>
              <TextFormat value={propertyServeEntity.createDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="update_user">Update User</span>
            </dt>
            <dd>{propertyServeEntity.update_user}</dd>
            <dt>
              <span id="update_date">Update Date</span>
            </dt>
            <dd>
              <TextFormat value={propertyServeEntity.update_date} type="date" format={APP_DATE_FORMAT} />
            </dd>
          </dl>
          <Button tag={Link} to="/entity/property-serve" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/property-serve/${propertyServeEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ propertyServe }: IRootState) => ({
  propertyServeEntity: propertyServe.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyServeDetail);
