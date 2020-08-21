import "./index.scss";

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Row, Col } from "reactstrap";
import { Translate, ICrudGetAction, TextFormat } from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IRootState } from "app/shared/reducers";
import { getEntity } from "./sales.reducer";
import { ISales } from "app/shared/model/sales.model";
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from "app/config/constants";

// Components material-ui
import CustomButton from "@material-ui/core/Button";

const back = {
  backgroundColor: "#00b0b9",
  color: "#fff",
};

const save = {
  backgroundColor: "#008eb8",
  color: "#fff",
};
export interface ISalesDetailProps
  extends StateProps,
    DispatchProps,
    RouteComponentProps<{ id: string }> {}

export const SalesDetail = (props: ISalesDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { salesEntity } = props;
  return (
    <Row className="container-details">
      <div>
        <h2>
          <Translate contentKey="testApp.sales.detail.title">Sales</Translate> [
          <b>{salesEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="description" className="content-key">
              <Translate contentKey="testApp.sales.description">
                Description
              </Translate>
            </span>
          </dt>
          <dd>{salesEntity.description}</dd>
          <dt>
            <span id="state" className="content-key">
              <Translate contentKey="testApp.sales.state">State</Translate>
            </span>
          </dt>
          <dd>{salesEntity.state}</dd>
          <dt>
            <span id="date" className="content-key">
              <Translate contentKey="testApp.sales.date">Date</Translate>
            </span>
          </dt>
          <dd>
            {salesEntity.date ? (
              <TextFormat
                value={salesEntity.date}
                type="date"
                format={APP_LOCAL_DATE_FORMAT}
              />
            ) : null}
          </dd>
        </dl>
        <Button tag={Link} to="/sales" 
        replace
         className="button-none-styles">
          <CustomButton style={back}>
            <FontAwesomeIcon icon="arrow-left" />{" "}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </CustomButton>
        </Button>
        &nbsp;
        <Button
          tag={Link}
          to={`/sales/${salesEntity.id}/edit`}
          replace
          className="button-none-styles"
        >
          <CustomButton style={save}>
            <FontAwesomeIcon icon="pencil-alt" />{" "}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </CustomButton>
        </Button>
      </div>
    </Row>
  );
};

const mapStateToProps = ({ sales }: IRootState) => ({
  salesEntity: sales.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SalesDetail);
