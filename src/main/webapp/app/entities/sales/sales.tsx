import "./index.scss";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Col, Row, Table } from "reactstrap";
import { Translate, ICrudGetAllAction, TextFormat } from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IRootState } from "app/shared/reducers";
import { getEntities } from "./sales.reducer";
import { ISales } from "app/shared/model/sales.model";
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from "app/config/constants";

// Components material-ui
import CustomButton from "@material-ui/core/Button";

const style = {
  backgroundColor: "#2a6a9e",
  color: "#fff",
};

const view = {
  backgroundColor: "#00b0b9",
  color: "#fff",
};

const edit = {
  backgroundColor: "#008eb8",
  color: "#fff",
};

const Delete = {
  backgroundColor: "#fd6060",
  color: "#fff",
};

export interface ISalesProps
  extends StateProps,
    DispatchProps,
    RouteComponentProps<{ url: string }> {}

export const Sales = (props: ISalesProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { salesList, match, loading } = props;
  return (
    <div>
      <h2 id="sales-heading" className="sales-heading">
        <div>
          <Translate contentKey="testApp.sales.home.title">Sales</Translate>
        </div>
        <div>
          <Link to={`${match.url}/new`} id="jh-create-entity">
          <CustomButton style={style}>
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="testApp.sales.home.createLabel">
              Create new Sales
            </Translate>
          </CustomButton>
        </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {salesList && salesList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr className="contentKey">
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="testApp.sales.description">
                    Description
                  </Translate>
                </th>
                <th>
                  <Translate contentKey="testApp.sales.state">State</Translate>
                </th>
                <th>
                  <Translate contentKey="testApp.sales.date">Date</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {salesList.map((sales, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button
                      tag={Link}
                      to={`${match.url}/${sales.id}`}
                      color="link"
                      size="sm"
                    >
                      {sales.id}
                    </Button>
                  </td>
                  <td>{sales.description}</td>
                  <td>
                    <Translate contentKey={`testApp.State.${sales.state}`} />
                  </td>
                  <td>
                    {sales.date ? (
                      <TextFormat
                        type="date"
                        value={sales.date}
                        format={APP_LOCAL_DATE_FORMAT}
                      />
                    ) : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`${match.url}/${sales.id}`}
                        className="button-none-styles"
                      >
                        <CustomButton style={view} className="button-group">
                          <FontAwesomeIcon icon="eye" />{" "}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">
                              View
                            </Translate>
                          </span>
                        </CustomButton>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${sales.id}/edit`}
                        className="button-none-styles"
                      >
                        <CustomButton style={edit} className="button-group">
                          <FontAwesomeIcon icon="pencil-alt" />{" "}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">
                              Edit
                            </Translate>
                          </span>
                        </CustomButton>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${sales.id}/delete`}
                        className="button-none-styles"
                      >
                        <CustomButton style={Delete} className="button-group">
                          <FontAwesomeIcon icon="trash" />{" "}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">
                              Delete
                            </Translate>
                          </span>
                        </CustomButton>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="testApp.sales.home.notFound">
                No Sales found
              </Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ sales }: IRootState) => ({
  salesList: sales.entities,
  loading: sales.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Sales);
