import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link,withRouter } from "react-router-dom";

import {Container} from 'react-bootstrap';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import PropType from 'prop-types';
import clsx from 'clsx';
import MenuItem from '@material-ui/core/MenuItem';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';





export default function Dialogo() {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('xs');

  const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      backgroundColor: theme.palette.primary
    },
    dense: {
      marginTop: theme.spacing(2),
    },
    menu: {
      width: 200,
    },
  }));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog 
        open={open} 
        aria-labelledby="form-dialog-title"
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
          <Container style={{textAlign: 'center'}}>
            <TextField
              id="outlined-name"
              label="nombre"
              name="nombre"
              className={useStyles.textField}
              // onChange={handleChange('name')}
              margin="normal"
              variant="outlined"/>
              <br/>
              <TextField
                id="outlined-name"
                label="Apellido"
                name="apellido"
                className={useStyles.textField}
                margin="normal"
                variant="outlined"/>
              <br/>
          </Container>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Salir
          </Button>
          <Button onClick={handleClose} color="secondary">
            Eliminar
          </Button>
          <Button onClick={handleClose} color="primary">
            Modificar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

