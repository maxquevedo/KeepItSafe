import { Component, OnInit } from '@angular/core';
import { Cliente } from '../clientes/cliente';
import { ClienteService } from '../clientes/cliente.service';
import { ProfesionalService } from '../profesionales/profesional.service';
import { Profesional } from '../profesionales/profesional';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-solicitarasesoria',
  templateUrl: './solicitarasesoria.component.html',
  styleUrls: ['./solicitarasesoria.component.css']
})
export class SolicitarasesoriaComponent implements OnInit {

  profesionales: Profesional;
  clientes: Cliente;
  params = this.activedRoute.snapshot.params;
  usuario = sessionStorage.getItem('USR_NOMBRECOMPLETO');
  constructor(private clienteService: ClienteService, private profesionalService: ProfesionalService, private activedRoute: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.getClientes();
    console.log(this.params);
  }
  getClientes(){
    this.profesionalService.getProfCli().subscribe( 
      res => this.getpro(res),
      err => console.error(err)
    );

  };
  getpro(res){
    this.profesionales = res;
    console.log("desde getcliente",this.profesionales);
  };

}
