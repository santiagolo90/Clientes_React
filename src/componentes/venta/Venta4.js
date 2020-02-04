import React from 'react';
import {Button as BTN} from 'primereact/button';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

export default function FormDialog() {
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

      const currencies = [
        {
          value: true,
          label: 'si',
        },
        {
          value: false,
          label: 'no',
        }
      ];

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ display: "contents"}} >
        <BTN 
                type="button" 
                icon="pi pi-shopping-cart" 
                className="p-button-success"
                style={{marginRight: '.5em'}}
                onClick={handleClickOpen}>

        </BTN>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Generar Venta</DialogTitle>
        <DialogContent style={{textAlign: "center"}} >
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
                id="outlined-name"
                label="producto"
                name="producto"
                className={useStyles.textField}
                margin="normal"
                variant="outlined"/><br/>
            <TextField
                id="standar-name"
                name="fecha"
                type="date"
                className={useStyles.textField}
                margin="normal"
                variant="outlined"/><br/>
            <TextField
                id="standar-name"
                label="monto"
                name="monto"
                type="number"
                className={useStyles.textField}
                margin="normal"
                variant="outlined"/><br/>
            <TextField
                id="outlined-select-currency"
                select
                label="Select"
                name="cobrado"
                className={useStyles.textField}
                SelectProps={{
                  MenuProps: {
                    className: useStyles.menu,
                  },
                }}
                helperText="Please select your currency"
                margin="normal"
                variant="outlined"
            >             
                {currencies.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
            </TextField><br/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}