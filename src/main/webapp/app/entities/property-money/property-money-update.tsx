import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './property-money.reducer';
import { IPropertyMoney } from 'app/shared/model/property-money.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPropertyMoneyUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPropertyMoneyUpdateState {
  isNew: boolean;
}

export class PropertyMoneyUpdate extends React.Component<IPropertyMoneyUpdateProps, IPropertyMoneyUpdateState> {
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
    values.createdDate = new Date(values.createdDate);
    values.lastModifiedDate = new Date(values.lastModifiedDate);

    if (errors.length === 0) {
      const { propertyMoneyEntity } = this.props;
      const entity = {
        ...propertyMoneyEntity,
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
    this.props.history.push('/entity/property-money');
  };

  render() {
    const { propertyMoneyEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="propertyApp.propertyMoney.home.createOrEditLabel">Create or edit a PropertyMoney</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : propertyMoneyEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="property-money-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="addressLabel" for="address">
                    Address
                  </Label>
                  <AvField id="property-money-address" type="text" name="address" />
                </AvGroup>
                <AvGroup>
                  <Label id="shouldLabel" for="should">
                    Should
                  </Label>
                  <AvField
                    id="property-money-should"
                    type="text"
                    name="should"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="isPayLabel" check>
                    <AvInput id="property-money-isPay" type="checkbox" className="form-control" name="isPay" />
                    Is Pay
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="yearLabel" for="year">
                    Year
                  </Label>
                  <AvField id="property-money-year" type="text" name="year" />
                </AvGroup>
                <AvGroup>
                  <Label id="monthLabel" for="month">
                    Month
                  </Label>
                  <AvField id="property-money-month" type="text" name="month" />
                </AvGroup>
                <AvGroup>
                  <Label id="remarkLabel" for="remark">
                    Remark
                  </Label>
                  <AvField id="property-money-remark" type="text" name="remark" />
                </AvGroup>
                <AvGroup>
                  <Label id="dltLabel" for="dlt">
                    Dlt
                  </Label>
                  <AvField id="property-money-dlt" type="string" className="form-control" name="dlt" />
                </AvGroup>
                <AvGroup>
                  <Label id="createdByLabel" for="createdBy">
                    Created By
                  </Label>
                  <AvField id="property-money-createdBy" type="text" name="createdBy" />
                </AvGroup>
                <AvGroup>
                  <Label id="createdDateLabel" for="createdDate">
                    Created Date
                  </Label>
                  <AvInput
                    id="property-money-createdDate"
                    type="datetime-local"
                    className="form-control"
                    name="createdDate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.propertyMoneyEntity.createdDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="lastModifiedByLabel" for="lastModifiedBy">
                    Last Modified By
                  </Label>
                  <AvField id="property-money-lastModifiedBy" type="text" name="lastModifiedBy" />
                </AvGroup>
                <AvGroup>
                  <Label id="lastModifiedDateLabel" for="lastModifiedDate">
                    Last Modified Date
                  </Label>
                  <AvInput
                    id="property-money-lastModifiedDate"
                    type="datetime-local"
                    className="form-control"
                    name="lastModifiedDate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.propertyMoneyEntity.lastModifiedDate)}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/property-money" replace color="info">
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
  propertyMoneyEntity: storeState.propertyMoney.entity,
  loading: storeState.propertyMoney.loading,
  updating: storeState.propertyMoney.updating,
  updateSuccess: storeState.propertyMoney.updateSuccess
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
)(PropertyMoneyUpdate);
