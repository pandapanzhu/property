import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './stuff.reducer';
import { IStuff } from 'app/shared/model/stuff.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStuffDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class StuffDetail extends React.Component<IStuffDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { stuffEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Stuff [<b>{stuffEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="userId">User Id</span>
            </dt>
            <dd>{stuffEntity.userId}</dd>
            <dt>
              <span id="stuffname">Stuffname</span>
            </dt>
            <dd>{stuffEntity.stuffname}</dd>
            <dt>
              <span id="gender">Gender</span>
            </dt>
            <dd>{stuffEntity.gender}</dd>
            <dt>
              <span id="phone">Phone</span>
            </dt>
            <dd>{stuffEntity.phone}</dd>
            <dt>
              <span id="email">Email</span>
            </dt>
            <dd>{stuffEntity.email}</dd>
            <dt>
              <span id="idcard">Idcard</span>
            </dt>
            <dd>{stuffEntity.idcard}</dd>
            <dt>
              <span id="address">Address</span>
            </dt>
            <dd>{stuffEntity.address}</dd>
            <dt>
              <span id="remark">Remark</span>
            </dt>
            <dd>{stuffEntity.remark}</dd>
            <dt>
              <span id="dlt">Dlt</span>
            </dt>
            <dd>{stuffEntity.dlt}</dd>
            <dt>
              <span id="create_user">Create User</span>
            </dt>
            <dd>{stuffEntity.create_user}</dd>
            <dt>
              <span id="createDate">Create Date</span>
            </dt>
            <dd>
              <TextFormat value={stuffEntity.createDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="update_user">Update User</span>
            </dt>
            <dd>{stuffEntity.update_user}</dd>
            <dt>
              <span id="update_date">Update Date</span>
            </dt>
            <dd>
              <TextFormat value={stuffEntity.update_date} type="date" format={APP_DATE_FORMAT} />
            </dd>
          </dl>
          <Button tag={Link} to="/entity/stuff" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/stuff/${stuffEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ stuff }: IRootState) => ({
  stuffEntity: stuff.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StuffDetail);
