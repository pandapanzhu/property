import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './property-serve.reducer';
import { IPropertyServe } from 'app/shared/model/property-serve.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPropertyServeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPropertyServeUpdateState {
  isNew: boolean;
}

export class PropertyServeUpdate extends React.Component<IPropertyServeUpdateProps, IPropertyServeUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    values.createDate = new Date(values.createDate);
    values.update_date = new Date(values.update_date);

    if (errors.length === 0) {
      const { propertyServeEntity } = this.props;
      const entity = {
        ...propertyServeEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/property-serve');
  };

  render() {
    const { propertyServeEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="propertyApp.propertyServe.home.createOrEditLabel">Create or edit a PropertyServe</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : propertyServeEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="property-serve-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="userIdLabel" for="userId">
                    User Id
                  </Label>
                  <AvField
                    id="property-serve-userId"
                    type="text"
                    name="userId"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="reasonLabel" for="reason">
                    Reason
                  </Label>
                  <AvField
                    id="property-serve-reason"
                    type="text"
                    name="reason"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="typeLabel" for="type">
                    Type
                  </Label>
                  <AvField id="property-serve-type" type="text" name="type" />
                </AvGroup>
                <AvGroup>
                  <Label id="remarkLabel" for="remark">
                    Remark
                  </Label>
                  <AvField id="property-serve-remark" type="text" name="remark" />
                </AvGroup>
                <AvGroup>
                  <Label id="dltLabel" for="dlt">
                    Dlt
                  </Label>
                  <AvField id="property-serve-dlt" type="string" className="form-control" name="dlt" />
                </AvGroup>
                <AvGroup>
                  <Label id="create_userLabel" for="create_user">
                    Create User
                  </Label>
                  <AvField id="property-serve-create_user" type="text" name="create_user" />
                </AvGroup>
                <AvGroup>
                  <Label id="createDateLabel" for="createDate">
                    Create Date
                  </Label>
                  <AvInput
                    id="property-serve-createDate"
                    type="datetime-local"
                    className="form-control"
                    name="createDate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.propertyServeEntity.createDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="update_userLabel" for="update_user">
                    Update User
                  </Label>
                  <AvField id="property-serve-update_user" type="text" name="update_user" />
                </AvGroup>
                <AvGroup>
                  <Label id="update_dateLabel" for="update_date">
                    Update Date
                  </Label>
                  <AvInput
                    id="property-serve-update_date"
                    type="datetime-local"
                    className="form-control"
                    name="update_date"
                    value={isNew ? null : convertDateTimeFromServer(this.props.propertyServeEntity.update_date)}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/property-serve" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  propertyServeEntity: storeState.propertyServe.entity,
  loading: storeState.propertyServe.loading,
  updating: storeState.propertyServe.updating,
  updateSuccess: storeState.propertyServe.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyServeUpdate);
