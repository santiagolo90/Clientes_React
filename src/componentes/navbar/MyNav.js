import React from 'react';
import ReactDOM from 'react-dom';
import { Navbar,Nav,Container,Button} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link,withRouter } from "react-router-dom";
import Formulario from  '../formulario/Formulario'
import Venta from  '../venta/Venta'
import Grilla from  '../grilla/grilla'
import GrillaVentas from  '../grillaVentas/grillaVentas'
import './MyNav.css';



class MyNav extends React.Component{
    
    constructor(props){
        super(props);
    }

    render(){
        let {logo} = this.props;
        return([
            <div key="1">
                <Container>
                  <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
                    <Navbar.Brand href="#home">
                      <img src={logo} width="30" height="30" className="d-inline-block align-top App-logo" alt="Logo"/>
                       {' React SLopez'}
                    </Navbar.Brand>
                      <Navbar.Toggle aria-controls="collapseNav" />
                      <Navbar.Collapse id="collapseNav">
                        <Nav className="mr-auto">
                          <Link className="nav-link" to="/clientes/cargar" >Alta</Link> 
                          <Link className="nav-link" to="/clientes" >Grilla</Link>
                          <Link className="nav-link" to="/ventas" >Ventas</Link>
                          {/* <Link className="nav-link" to="/clientes/update/:id" >Modificar</Link>  */}
                         
                          {/* <Button className="nav-link" variant="dark">
                            <Link className="nav-link" to="/grilla/" >Grilla</Link> 
                          </Button>
                          <Button className="nav-link"  variant="link">
                            <Link className="nav-link" to="/formulario/" >Formulario</Link>
                          </Button> */}
                        </Nav>
                       </Navbar.Collapse>
                  </Navbar>
                </Container>
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

