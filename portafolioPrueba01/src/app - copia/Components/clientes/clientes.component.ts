import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { Router} from '@angular/router';

import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: [
  ]
})
export class ClientesComponent implements OnInit {


  clientes: Cliente[];

  constructor( private clienteService: ClienteService, private router: Router ) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(

        clientes => this.clientes = clientes

    );
}

delete(cliente: Cliente): void{
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: 'Estás Seguro?',
    text: `¿Seguro que deseas eliminar al cliente ${cliente.razon_social}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, Eliminar!',
    cancelButtonText: 'No, Cancelar!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      this.clienteService.delete(cliente.id_cliente).subscribe(
        response =>{
          this.clientes = this.clientes.filter(cli => cli !== cliente)
          swalWithBootstrapButtons.fire(
            'Cliente eliminado!',
            `Cliente ${cliente.razon_social} Eliminado con éxito `,
            'success'
          );
        }
      );
    }
  });
}

}
