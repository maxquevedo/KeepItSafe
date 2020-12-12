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
    USR_TIPOUSUARIO:'',
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
    cargarCliente(res){ 
      this.clienteService.getCliente(this.cliente.CLI_ID).subscribe(
        res => console.log(res),
        err => console.error(err)
      );

    }

/*
    cargarCliente(): void {
      this.activateRoute.params.subscribe(params => {
        let id_cliente = params['CLI_ID']
        if (id_cliente){
          this.clienteService.getCliente(id_cliente).subscribe( (cliente) => this.cliente = cliente);
        }
      });
    }
*/


    create(): void{
      
      this.clienteService.create(this.cliente).subscribe(
        res => {
          console.log(this.cliente);
        },
        err => console.error(err)
      );
      /*
    this.clienteService.create(this.cliente)
    .subscribe( cliente => {
      this.router.navigate(['/clientes']);
      swal.fire('Nuevo cliente', `cliente ${cliente.USR_NOMBRECOMPLETO} creado con exito!`, 'success');
    }
    );*/
  }

  update(): void{
    /*
    this.clienteService.update(this.cliente).subscribe( 
      cliente => {
        this.router.navigate(['/clientes'])
        swal.fire('Cliente', `Cliente ${cliente.razon_social} actualizado con exito!`, 'success');
      }
    )
      */
}

}
