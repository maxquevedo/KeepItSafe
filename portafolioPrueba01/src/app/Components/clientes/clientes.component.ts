import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { Router} from '@angular/router';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';
import { Usuario } from './usuario';
//import { Cliente, Cliente } from '../revisarcliente/cliente';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: [
  ]
})
export class ClientesComponent implements OnInit {

  usuarios: Usuario;

  constructor( private clienteService: ClienteService, private router: Router ) { }

  ngOnInit(): void {
    this.importCliente();   
    
}

importCliente(){
  this.clienteService.getClientes().subscribe( 
    res => this.getClientes(res),
    err => console.error(err)
  );
}

getClientes(res){
  this.usuarios = res;
  console.log("desde getcliente",this.usuarios);
}

editar(id:string){
  console.log(`desde asignarpro:`,id);
  this.router.navigate([`clientes/form/${id}`]);
}

delete(usuario: Usuario): void{
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: 'Deshabilitar',
    text: `¿Seguro que deseas deshabilitar al cliente ${usuario.USR_NOMBRECOMPLETO}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, deshabilitar!',
    cancelButtonText: 'No, Cancelar!',
  }).then((result) => {
    if (result.isConfirmed) {
      this.clienteService.delete(usuario.USR_ID).subscribe(
        response =>{
          this.ngOnInit();
          //this.usuario = this.usuario.filter(cli => cli !== cliente)
          swalWithBootstrapButtons.fire(
            'Cliente deshabilitado!',
            `Cliente ${usuario.USR_NOMBRECOMPLETO} deshabilitar con éxito `,
            'success'
          );
        }
      );
    }
  });
}

}
