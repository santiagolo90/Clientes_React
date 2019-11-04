import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link,withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropType from 'prop-types';
import ClientesService from '../../servicios/cliente-service';
import Grilla from '../grilla/grilla'


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




class Venta extends React.Component{
    cs;
    clienteAux;
    constructor(props){
        super(props);
        this.state ={
          nombre:"",
          apellido:"",
          cta_cte:"",
          compras:[],
          producto:"",
          fecha:"",
          monto:"",
          cobrado:"",
        }
        this.cs = new ClientesService()
    }

    componentDidMount() {

       if (this.props.location.state) {         
         this.setState({...this.props.location.state.cliente})
       }
    }
    
    handleChange =(e) => {
        //console.log("evento: ",e);
        let name = e.target.name;
        this.setState({
        [name]: e.target.value
        })
        
    }


    
     enviarForm = async (e)  => {
      e.preventDefault();
      let compraAux = new Compra(
        this.state.producto,
        this.state.fecha,
        this.state.monto,
        this.state.cobrado
      )
      let montoFinal = this.state.cta_cte;
      if (this.state.cobrado == false) {
        montoFinal = Number(montoFinal) + Number(this.state.monto);
      }
       let cliModel = new cliente(this.state.nombre,
                                   this.state.apellido,
                                   Number(this.state.id),
                                   Number(montoFinal),
                                   compraAux)
       let cliFinal = new ClienteDTO(cliModel);
       console.log(cliFinal);
       
      const a = await this.cs.editClienteMongo(cliFinal);
       if (a == true) {
         this.props.history.push("/clientes")
       }
    }



    render(){

        return(
            <div>
                <form className={useStyles.container} onSubmit={this.enviarForm}>
                    <TextField
                        id="outlined-name"
                        label="producto"
                        name="producto"
                        className={useStyles.textField}
                        value={this.state.producto}
                        // onChange={handleChange('name')}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <br/>
                    <TextField
                        id="standar-name"
                        name="fecha"
                        type="date"
                        className={useStyles.textField}
                        value={this.state.fecha}
                        // onChange={handleChange('name')}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <br/>
                    <TextField
                        id="standar-name"
                        label="monto"
                        name="monto"
                        type="number"
                        className={useStyles.textField}
                        value={this.state.monto}
                        // onChange={handleChange('name')}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <br/>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Select"
                        name="cobrado"
                        className={useStyles.textField}
                        value={this.state.cobrado}
                        onChange={this.handleChange}
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
                    </TextField>

                      <br/>
                    <Button 
                      type="submit" 
                      variant="contained" 
                      color="primary">
                        Enviar
                    </Button>
                </form>
                
            </div>
        )
    }

}

export default withRouter(Venta);


class Compra{

  constructor(producto,fecha,monto,cobrado){
    this.producto = producto;
    this.fecha = fecha;
    this.monto = monto;
    this.cobrado = cobrado;
  }

}

class cliente{

  constructor(nombre,apellido,id,cta_cte, compras){
    this.nombre = nombre;
    this.apellido = apellido;
    this.id = id;
    this.cta_cte = cta_cte;
    this.compras = compras;
  }

}

class ClienteDTO{
  constructor(cliente){
    this.cliente = cliente;
  }
}