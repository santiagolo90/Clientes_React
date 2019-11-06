import React from 'react';
import ReactDOM from 'react-dom';

let id = 1;
let url = "http://localhost:3001/"

class ClientesService extends React.Component{
    
    constructor(props){
        super(props);
    }
    
    getClientesMongo() {
      return fetch(url + 'api/clientes')
          .then(function(response) {
              return response.json();
          })
          .then(function(data) {
              return data
          });
    }

    getClienteMongo(clienteId) {
      return fetch(url + 'api/cliente/'+clienteId)
          .then(function(response) {
              return response.json();
          })
          .then(function(data) {
            
              return data
          });
    }

    addClienteMongo(cliModel){
      return fetch(url+"api/clientes", {
        method: "POST" ,
        body: JSON.stringify(cliModel), 
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(res =>{return true;});
    }


    editClienteMongo(cliModel){   
      return fetch(url+"api/cliente/", {
        method: 'PUT',
        body: JSON.stringify(cliModel),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(res =>{
        return true;
        });
    }

    removeClienteMongo(clienteID){   
      return fetch(url+"api/cliente/"+clienteID, {
        method: 'DELETE',
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(res =>{
        return true;
        });
    }
    
}

export default ClientesService;

