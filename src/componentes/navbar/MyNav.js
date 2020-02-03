import React from 'react';
import ReactDOM from 'react-dom';
import { Navbar,Nav,Container} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link,withRouter } from "react-router-dom";
import Formulario from  '../formulario/Formulario'
import Venta from  '../venta/Venta'
import Grilla from  '../grilla/grilla'
import GrillaVentas from  '../grillaVentas/grillaVentas'
import './MyNav.css';


import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

class MyNav extends React.Component{

     menuList;
    
    constructor(props){
        super(props);
        this.state = {
          open: false,
          show: null
      };
      
      this.menuList = [];
    }

    componentDidMount(){
      //Aca debería llamar a un service que me traiga el menu
      this.menuList = [
        {
          nombre: "Alta",
          ruta: "/clientes/cargar"
        },
        {
          nombre: "Grilla",
          ruta: "/clientes"
        },
        {
          nombre: "Ventas",
          ruta: "/ventas"
        },
        {
          nombre: "Modificar",
          ruta: "/clientes/update/:id"
        },
      ]
    }

    handleToggle = () => this.setState({ open: !this.state.open });

    showBar = () => {
      this.setState({ show: 'bar', open: false });
    };


    listarMenu = () => {
      let menu = []
      for (let i = 0; i < this.menuList.length; i++) {
        menu.push(
        <MenuItem key={i } onClick={this.handleToggle}>
          <a onClick={() => this.props.history.push(this.menuList[i].ruta) }>{this.menuList[i].nombre}</a>
        </MenuItem>)
      }
      return menu
    }
    
    render(){
        let {logo} = this.props;
        return([
            <div key="1">
                  <AppBar position="static">
                    <Toolbar>
                      <IconButton edge="start" onClick={this.handleToggle} className={useStyles.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                      </IconButton>
                      <Typography variant="h6" className={useStyles.title}>
                        <img src={logo} width="30" height="30" className="d-inline-block align-top App-logo" alt="Logo"/>
                        {' React SLopez'}
                      </Typography>

                    </Toolbar>
                  </AppBar>
                <Drawer 
                  open={this.state.open}
                  onClose={open => this.setState({ open:false })}>
                    <MenuItem onClick={this.handleToggle}>
                      <IconButton edge="start" onClick={open => this.setState({ open:false })} className={useStyles.menuButton} color="inherit" aria-label="menu">
                        <CloseIcon />
                      </IconButton>
                    </MenuItem>
                    {this.listarMenu()}
                </Drawer>
          </div>,
            <div className="cuerpo" key="2">
                <Route exact path="/clientes" component={Grilla} />
                <Route exact path="/clientes/cargar" component={Formulario} />
                <Route exact path="/clientes/update/:id" component={Formulario} />
                <Route exact path="/ventas/cargar/:id" component={Venta} />
                <Route exact path="/ventas" component={GrillaVentas} />
            </div>
          
        ])
    }

}

export default withRouter(MyNav);
