import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  constructor( private clienteService: ClienteService, private router: Router, private activateRoute: ActivatedRoute) { }



  ngOnInit(): void {

    this.cargarCliente();
  }

    cargarCliente(): void {
      this.activateRoute.params.subscribe(params => {
        let id_cliente = params[ 'id_cliente']
        if (id_cliente){
          this.clienteService.getCliente(id_cliente).subscribe( (cliente) => this.cliente = cliente);
        }
      });
    }



    create(): void{
    this.clienteService.create(this.cliente)
    .subscribe( cliente => {
      this.router.navigate(['/clientes']);
      swal.fire('Nuevo cliente', `cliente ${cliente.razon_social} creado con exito!`, 'success');
    }
    );
  }

  update(): void{
    this.clienteService.update(this.cliente).subscribe( 
      cliente => {
        this.router.navigate(['/clientes'])
        swal.fire('Cliente', `Cliente ${cliente.razon_social} actualizado con exito!`, 'success');
      }
    )

}
}
