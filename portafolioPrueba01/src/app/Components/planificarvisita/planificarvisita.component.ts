import { Component, OnInit } from '@angular/core';
import { Visitas } from './visitas';
import { PlanificarvisitaService } from './planificarvisita.service'
import { Profesional } from './profesional'
import { Usuario } from './usuario'

@Component({
  selector: 'app-planificarvisita',
  templateUrl: './planificarvisita.component.html',
  styleUrls: ['./planificarvisita.component.css']
})
export class PlanificarvisitaComponent implements OnInit {

  profesionales: Profesional;
  cliente: Usuario;

  visita: Visitas ={
    VIS_ID:'',
    VIS_FCREACION: new Date(),
    VIS_FCITA:'',
    VIS_ID_PRO:'',
    VIS_ID_CLI:''
  };

  constructor(private planificarvisitaService : PlanificarvisitaService) { }

  ngOnInit(): void {
    this.planificarvisitaService.getProfesionales().subscribe( 
      /*(res:Cliente[]) => {
        this.clientes = res;
      },*/
      pres => this.getProfesional(pres),
      err => console.error(err)),
      
      
      this.planificarvisitaService.getClientes().subscribe(
        cres => this.getCliente(cres),
        err => console.error(err))
  }

  getProfesional(pres){
    this.profesionales = pres;
    console.log("desde getProfesional",this.profesionales);
  }

  getCliente(cres){
    this.cliente = cres;
    console.log("desde getCliente",this.cliente);

  }
  


}
