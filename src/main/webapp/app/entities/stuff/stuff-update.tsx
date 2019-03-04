import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './stuff.reducer';
import { IStuff } from 'app/shared/model/stuff.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IStuffUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IStuffUpdateState {
  isNew: boolean;
}

export class StuffUpdate extends React.Component<IStuffUpdateProps, IStuffUpdateState> {
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
      const { stuffEntity } = this.props;
      const entity = {
        ...stuffEntity,
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
    this.props.history.push('/entity/stuff');
  };

  render() {
    const { stuffEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="propertyApp.stuff.home.createOrEditLabel">Create or edit a Stuff</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : stuffEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="stuff-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="userIdLabel" for="userId">
                    User Id
                  </Label>
                  <AvField
                    id="stuff-userId"
                    type="text"
                    name="userId"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="stuffnameLabel" for="stuffname">
                    Stuffname
                  </Label>
                  <AvField
                    id="stuff-stuffname"
                    type="text"
                    name="stuffname"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="genderLabel" for="gender">
                    Gender
                  </Label>
                  <AvField id="stuff-gender" type="text" name="gender" />
                </AvGroup>
                <AvGroup>
                  <Label id="phoneLabel" for="phone">
                    Phone
                  </Label>
                  <AvField
                    id="stuff-phone"
                    type="text"
                    name="phone"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      pattern: { value: '^[0-9]{11}$', errorMessage: 'This field should follow pattern for {{ pattern }}.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="emailLabel" for="email">
                    Email
                  </Label>
                  <AvField id="stuff-email" type="text" name="email" />
                </AvGroup>
                <AvGroup>
                  <Label id="idcardLabel" for="idcard">
                    Idcard
                  </Label>
                  <AvField
                    id="stuff-idcard"
                    type="text"
                    name="idcard"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="addressLabel" for="address">
                    Address
                  </Label>
                  <AvField id="stuff-address" type="text" name="address" />
                </AvGroup>
                <AvGroup>
                  <Label id="remarkLabel" for="remark">
                    Remark
                  </Label>
                  <AvField id="stuff-remark" type="text" name="remark" />
                </AvGroup>
                <AvGroup>
                  <Label id="dltLabel" for="dlt">
                    Dlt
                  </Label>
                  <AvField id="stuff-dlt" type="string" className="form-control" name="dlt" />
                </AvGroup>
                <AvGroup>
                  <Label id="create_userLabel" for="create_user">
                    Create User
                  </Label>
                  <AvField id="stuff-create_user" type="text" name="create_user" />
                </AvGroup>
                <AvGroup>
                  <Label id="createDateLabel" for="createDate">
                    Create Date
                  </Label>
                  <AvInput
                    id="stuff-createDate"
                    type="datetime-local"
                    className="form-control"
                    name="createDate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.stuffEntity.createDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="update_userLabel" for="update_user">
                    Update User
                  </Label>
                  <AvField id="stuff-update_user" type="text" name="update_user" />
                </AvGroup>
                <AvGroup>
                  <Label id="update_dateLabel" for="update_date">
                    Update Date
                  </Label>
                  <AvInput
                    id="stuff-update_date"
                    type="datetime-local"
                    className="form-control"
                    name="update_date"
                    value={isNew ? null : convertDateTimeFromServer(this.props.stuffEntity.update_date)}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/stuff" replace color="info">
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
  stuffEntity: storeState.stuff.entity,
  loading: storeState.stuff.loading,
  updating: storeState.stuff.updating,
  updateSuccess: storeState.stuff.updateSuccess
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
)(StuffUpdate);
