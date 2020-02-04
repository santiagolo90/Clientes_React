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
import './Formulario.css';

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


class Formulario extends React.Component{
    cs;
    constructor(props){
        super(props);
        this.state ={
          _id:"",
          nombre:"",
          apellido:"",
          cta_cte:0,
          compras:[]
        }
        this.cs = new ClientesService()
    }

    async componentDidMount() {
      if (this.props.location.state) {
        const data = await this.cs.getClienteMongo(this.props.location.state.cliente._id);
        this.state._id = this.props.location.state.cliente._id;
        this.setState({...data[0].cliente})
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
      //this.props.custom(e)
      let rta = false;
      
      let cliModel = new cliente(this.state.nombre,
                                  this.state.apellido,
                                  Number(this.state.cta_cte),
                                  this.state.compras)
      let cliFinal = new ClienteDTO(cliModel);
      if (this.state._id) {
        rta = await this.cs.editClienteMongo(this.state);
      }else{
        rta = await this.cs.addClienteMongo(cliFinal);
      }
      if (rta == true) {
          this.props.history.push("/clientes")
      }
    }



    render(){
      // console.log("state: ",this.state);
      
        return(
            <div className="formAlta">
              <h2>Alta de usuarios</h2>
                <form className={useStyles.container} onSubmit={this.enviarForm}>
                    <TextField
                        id="outlined-name"
                        label="nombre"
                        name="nombre"
                        className={useStyles.textField}
                        value={this.state.nombre}
                        // onChange={handleChange('name')}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <br/>
                    <TextField
                        id="standar-name"
                        label="Apellido"
                        name="apellido"
                        className={useStyles.textField}
                        value={this.state.apellido}
                        // onChange={handleChange('name')}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                    />
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

export default withRouter(Formulario);


class cliente{

  constructor(nombre, apellido, cta_cte, compras){
    this.nombre = nombre;
    this.apellido = apellido;
    this.cta_cte = cta_cte;
    this.compras = compras;
  }

}

class ClienteDTO{
  constructor(cliente){
    this.cliente = cliente;
  }
}

class Venta{

  constructor(producto,fecha,monto,cobrado){
    this.producto = producto;
    this.fecha = fecha;
    this.monto = monto;
    this.cobrado = cobrado;
  }

}