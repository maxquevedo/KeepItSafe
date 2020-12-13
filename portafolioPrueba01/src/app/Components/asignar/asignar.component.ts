import { Component, OnInit } from '@angular/core';
import { ProfesionalService } from '../profesionales/profesional.service';
import { Profesional } from '../profesionales/profesional';
import { Router, ActivatedRoute } from '@angular/router'
import { ClienteService } from '../clientes/cliente.service';
import { Cliente } from '../clientes/cliente'

@Component({
  selector: 'app-asignar',
  templateUrl: './asignar.component.html',
  styleUrls: ['./asignar.component.css']
})
export class AsignarComponent implements OnInit {

  profesionales: Profesional;
  clientes: Cliente;
  params = this.activedRoute.snapshot.params;

  constructor(private clienteService: ClienteService, private profesionalService: ProfesionalService, private activedRoute: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.getClientes();
    console.log(this.params);
  }

  getClientes(){
    this.clienteService.getClientes().subscribe( 
      res => this.getCliente(res),
      err => console.error(err)
    );

  };

  validarAsignacion(){}

  getCliente(res){
    this.clientes = res;
    console.log("desde getcliente",this.clientes);
  };

}
