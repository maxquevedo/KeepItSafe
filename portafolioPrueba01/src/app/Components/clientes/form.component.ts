import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Usuario } from './usuario';
import { ClientesComponent } from './clientes.component';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  clientes: Cliente;
  params = this.activedRoute.snapshot.params;
  id = this.params.id_cliente;

  cli: Cliente ={
    
    CLI_ID: '',
    CLI_ID_PRO: '',
    CLI_RAZONSOCIAL: '',
    CLI_RUT: '',
    CLI_STATUS: '',
    PLANES_PLA_IDPLAN: '',

    USR_CORREO: '',
    USR_ESTADO: '',
    USR_ID: '',
    USR_IDPERFIL: '',
    USR_NOMBRECOMPLETO: '',
    USR_PASSWORD: '',
    USR_TIPOUSUARIO: '',
    USR_USERNAME: ''
  };
  

  
  constructor( private clienteService: ClienteService,private activedRoute: ActivatedRoute, private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.id) {
      this.importCliente();
    }
    
  }

  importCliente(){
    this.clienteService.getCliente(this.id).subscribe( 
      res => {
        console.log("res", res[0]);
        this.cli = res[0];
      },
      err => console.error(err)
    );
    
  }

  guardarCliente(){
    var formateado = JSON.stringify({
      
      "id": this.id,
      "username":this.cli.USR_USERNAME,
      "password":this.cli.USR_PASSWORD,
      "email":this.cli.USR_CORREO,
      "rut":this.cli.CLI_RUT,
      "name":this.cli.USR_NOMBRECOMPLETO,
      "razonSocial":this.cli.CLI_RAZONSOCIAL,
      "status":this.cli.CLI_STATUS,
    
    });

    if (this.id) {
      console.log("edita",formateado);
      this.clienteService.update(this.id, formateado).subscribe(
        res => console.log(res),
        err => console.error(err)
      );
      
    } else {
      
    console.log("nuevo",formateado);
    this.clienteService.create(formateado).subscribe(
      res => console.log(res),
      err => console.error(err)
    );
      
    }

    console.log(formateado);
    ;
  }
}
