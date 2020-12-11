import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente'
import { ClienteService } from './cliente.service'

@Component({
  selector: 'app-revisarcliente',
  templateUrl: './revisarcliente.component.html',
  styleUrls: ['./revisarcliente.component.css']
})
export class RevisarclienteComponent implements OnInit {

  cliente : Cliente;

  constructor( private clienteService: ClienteService ) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe( 
      /*(res:Cliente[]) => {
        this.clientes = res;
      },*/
      res => this.getClientes(res),
      err => console.error(err)
    );
  }

  getClientes(res){
    this.cliente = res;
    console.log("desde rev getcliente",this.cliente);
  }

}
