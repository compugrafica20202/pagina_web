import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

export default function DialogoInfoCliente(props) {
  return (
    <Dialog open={props.open} onClose={() => props.changeOpen(false)}>
      <DialogTitle>Datos personales</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.msg}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={() => {
            props.decline();
            props.changeOpen(false);
          }}
        >
          No
        </Button>
        <Button
          color="primary"
          autoFocus
          onClick={() => {
            props.accept(props.formik.values);
            props.changeOpen(false);
          }}
        >
          Si
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DialogoInfoCliente.propTypes = {
  open: PropTypes.bool.isRequired,
  changeOpen: PropTypes.func.isRequired,
  msg: PropTypes.string.isRequired,
  formik: PropTypes.object.isRequired,
  decline: PropTypes.func.isRequired,
  accept: PropTypes.func.isRequired,
};
