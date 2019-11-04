import React from 'react';
import ReactDOM from 'react-dom';
import './grillaVentas.css';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import ClientesService from '../../servicios/cliente-service';
import Dialogo from '../../utils/dialogo/dialogo';
import { Alert } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link,withRouter } from "react-router-dom";



class GrillaVentas extends React.Component{
    listadoClientes;

    constructor(props){
        super(props);
        this.state = {};
        this.listadoClientes = new ClientesService()
    }

    async componentDidMount() {

         const data = await this.listadoClientes.getClientesMongo();
         this.setState({clientes: data})
    }



    render(){
    return([
        <div key="tabla" className="content-section implementation">
            <h3>Grilla</h3>
            <DataTable 
                value={this.state.clientes} 
                resizableColumns={true} 
                columnResizeMode="fit" 
                paginator={true} 
                // paginatorLeft={paginatorLeft} 
                // paginatorRight={paginatorRight} 
                rows={10} 
                rowsPerPageOptions={[5,10,20]}
                sortMode="multiple"
                selectionMode="single"
                selection={this.state.currentCliente} 
                onSelectionChange={e => this.setState({currentCliente: e.value})}>
                
                <Column field="nombre" header="Nombre" style={{width:'20%'}} sortable={true}/>
                <Column field="compras.producto" header="producto" style={{width:'40%'}} sortable={true}/>
                <Column field="compras.fecha" header="fecha" style={{width:'20%'}} sortable={true}/>
                <Column field="compras.monto" header="monto" style={{width:'20%'}} sortable={true}/>
            </DataTable>
        </div>
    ])}

}

export default withRouter(GrillaVentas);
