import "./scss/sales-update.scss";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Row, Col, Label } from "reactstrap";
import {
  AvFeedback,
  AvForm,
  AvGroup,
  AvInput,
  AvField,
} from "availity-reactstrap-validation";
import {
  Translate,
  translate,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
} from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IRootState } from "app/shared/reducers";

import { getEntity, updateEntity, createEntity, reset } from "./sales.reducer";
import { ISales } from "app/shared/model/sales.model";
import {
  convertDateTimeFromServer,
  convertDateTimeToServer,
  displayDefaultDateTime,
} from "app/shared/util/date-utils";
import { mapIdList } from "app/shared/util/entity-utils";

// Components material-ui
import CustomButton from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const back = {
  backgroundColor: "#00b0b9",
  color: "#fff",
};

const save = {
  backgroundColor: "#008eb8",
  color: "#fff",
};

export interface ISalesUpdateProps
  extends StateProps,
    DispatchProps,
    RouteComponentProps<{ id: string }> {}

export const SalesUpdate = (props: ISalesUpdateProps) => {
  const [isNew, setIsNew] = useState(
    !props.match.params || !props.match.params.id
  );

  const { salesEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push("/sales");
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...salesEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="testApp.sales.home.createOrEditLabel" className="tile-edit">
            <Translate contentKey="testApp.sales.home.createOrEditLabel">
              Create or edit a Sales
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : salesEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="sales-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput
                    id="sales-id"
                    type="text"
                    className="form-control"
                    name="id"
                    required
                    readOnly
                  />
                </AvGroup>
              ) : null}
              <AvGroup className="container-texField">
                <Label id="descriptionLabel" for="sales-description">
                  <Translate contentKey="testApp.sales.description">
                    Description
                  </Translate>
                </Label>
                <TextField
                  id="sales-description"
                  type="text"
                  name="description"
                  placeholder="Enter your description"  
                  variant="standard"
                  fullWidth
                />
              </AvGroup>
              <AvGroup className="container-texField">
                <Label id="stateLabel" for="sales-state">
                  <Translate contentKey="testApp.sales.state">State</Translate>
                </Label>
                <Select
                  id="sales-state"
                  fullWidth
                  name="state"
                  value={(!isNew && salesEntity.state) || "IN_CHARGE"}
                >
                  <MenuItem value="IN_CHARGE">
                    {translate("testApp.State.IN_CHARGE")}
                  </MenuItem>
                  <MenuItem value="SHIPPED">
                    {translate("testApp.State.SHIPPED")}
                  </MenuItem>
                  <MenuItem value="DELIVERED">
                    {translate("testApp.State.DELIVERED")}
                  </MenuItem>
                </Select>
              </AvGroup>
              <AvGroup className="container-texField">
                <Label id="dateLabel" for="sales-date">
                  <Translate contentKey="testApp.sales.date">Date</Translate>
                </Label>
                <TextField id="sales-date" type="date" name="date" fullWidth />
              </AvGroup>
              <div className="group-buttons">
                <div>
                  <Button tag={Link} id="cancel-save" to="/sales" replace className="button-none-styles">
                    <CustomButton style={back}>
                      <FontAwesomeIcon icon="arrow-left" />
                      &nbsp;
                      <span className="d-none d-md-inline">
                        <Translate contentKey="entity.action.back">
                          Back
                        </Translate>
                      </span>
                    </CustomButton>
                  </Button>
                </div>
                <div>
                  <Button className="button-none-styles">
                    <CustomButton
                      style={save}
                      id="save-entity"
                      type="submit"
                      disabled={updating}
                    >
                      <FontAwesomeIcon icon="save" />
                      &nbsp;
                      <span>
                        <Translate contentKey="entity.action.save">
                          Save
                        </Translate>
                      </span>
                    </CustomButton>
                  </Button>
                </div>
              </div>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  salesEntity: storeState.sales.entity,
  loading: storeState.sales.loading,
  updating: storeState.sales.updating,
  updateSuccess: storeState.sales.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SalesUpdate);
