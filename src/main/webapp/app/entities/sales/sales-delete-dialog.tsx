import "./index.scss";

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { Translate, ICrudGetAction, ICrudDeleteAction } from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ISales } from "app/shared/model/sales.model";
import { IRootState } from "app/shared/reducers";
import { getEntity, deleteEntity } from "./sales.reducer";

// Components material-ui
import CustomButton from "@material-ui/core/Button";

const cancelButton = {
  backgroundColor: "#2a6a9e",
  color: "#fff",
};

const deleteButton = {
  backgroundColor: "#fd6060",
  color: "#fff",
};

export interface ISalesDeleteDialogProps
  extends StateProps,
    DispatchProps,
    RouteComponentProps<{ id: string }> {}

export const SalesDeleteDialog = (props: ISalesDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push("/sales");
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.salesEntity.id);
  };

  const { salesEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} className="confirm-delete">
        <Translate contentKey="entity.delete.title">
          Confirm delete operation
        </Translate>
      </ModalHeader>
      <ModalBody id="testApp.sales.delete.question" className="body-modal">
        <Translate
          contentKey="testApp.sales.delete.question"
          interpolate={{ id: salesEntity.id }}
        >
          Are you sure you want to delete this Sales?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleClose} className="button-none-styles">
          <CustomButton style={cancelButton}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </CustomButton>
        </Button>
        <Button
          id="jhi-confirm-delete-sales"
          onClick={confirmDelete}
          className="button-none-styles"
        >
          <CustomButton style={deleteButton}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </CustomButton>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ sales }: IRootState) => ({
  salesEntity: sales.entity,
  updateSuccess: sales.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SalesDeleteDialog);
