import React from 'react';
import ReactDOM from 'react-dom';
import './grilla.css';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import ClientesService from '../../servicios/cliente-service';
import Dialogo from '../../utils/dialogo/dialogo';
import { Alert } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link,withRouter } from "react-router-dom";



class Grilla extends React.Component{
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

    actionTemplate = (rowData, column) => {
        return <div>
            <Button type="button" 
                    icon="pi pi-trash" 
                    className="p-button-danger" 
                    style={{marginRight: '.5em'}}
                    onClick={ e =>{ this.eliminarCliente(rowData)}}>

            </Button>
            <Button 
                type="button" 
                icon="pi pi-pencil" 
                className="p-button-warning"
                style={{marginRight: '.5em'}}
                onClick={ e =>{ this.modificarCliente(rowData)}}>

            </Button>
            <Button 
                type="button" 
                icon="pi pi-shopping-cart" 
                className="p-button-succes"
                style={{marginRight: '.5em'}}
                onClick={ e =>{ this.cargarVenta(rowData)}}>

            </Button>
        </div>;
    }


    modificarCliente =(rowData) => {
        //this.props.history.push("/clientes/update/")

        // this.props.history.push({
        //     pathname: '/clientes/update/'+rowData,
        //   })
        this.props.history.push({
            pathname: '/clientes/update/'+rowData._id,
            state: { cliente: rowData }
          })
        //console.log(rowData);
    }

    cargarVenta =(rowData) => {
        this.props.history.push({
            pathname: '/ventas/cargar/'+rowData.id,
            state: { cliente: rowData }
          })
    }

     eliminarCliente = async (rowData) => {
        await this.listadoClientes.removeClienteMongo(rowData.id);
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

                <Column field="_id" header="id" style={{width:'20%'}} sortable={true}/>
                <Column field="cliente.nombre" header="Nombre" style={{width:'10%'}} sortable={true}/>
                <Column field="cliente.apellido" header="Apellido" style={{width:'10%'}} sortable={true}/>
                <Column field="cliente.cta_cte" header="cta_cte" style={{width:'10%'}} sortable={true}/>
                <Column body={this.actionTemplate} style={{textAlign:'center', width: '8em'}}/>

            </DataTable>
        </div>
    ])}

}

export default withRouter(Grilla);

