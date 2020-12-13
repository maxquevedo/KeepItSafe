import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Usuario } from './usuario';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  cliente: Cliente ={
    USR_ID:'',
    USR_USERNAME:'',
    USR_CORREO:'',
    USR_NOMBRECOMPLETO:'',
    USR_PASSWORD:'',
    USR_TIPOUSUARIO:'Cliente',
    USR_IDPERFIL:'',
    CLI_RUT: '',
    CLI_RAZONSOCIAL: '',
    CLI_STATUS: '',
    CLI_ID_PRO: '',
    PLANES_PLA_IDPLAN: ''
  };
  

  
  constructor( private clienteService: ClienteService, private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {

  }

  guardarCliente(){
    var formateado = JSON.stringify({
    
      "username":this.cliente.USR_USERNAME,
      "password":this.cliente.USR_PASSWORD,
      "email":this.cliente.USR_CORREO,
      "rut":this.cliente.CLI_RUT,
      "name":this.cliente.USR_NOMBRECOMPLETO,
      "razonSocial":this.cliente.CLI_RAZONSOCIAL,
      "status":this.cliente.CLI_STATUS,
    
    });
    
    console.log(formateado);
    //this.clienteService.create(this.formateado);
  }
}
