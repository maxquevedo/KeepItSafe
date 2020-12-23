import { Component, OnInit } from '@angular/core';
import { Visitas } from './visitas';
import { PlanificarvisitaService } from './planificarvisita.service';
import { Profesional } from './profesional';
import { Cliente } from '../clientes/cliente';

@Component({
  selector: 'app-planificarvisita',
  templateUrl: './planificarvisita.component.html',
  styleUrls: ['./planificarvisita.component.css']
})
export class PlanificarvisitaComponent implements OnInit {
  cliente: Cliente = new Cliente();
  visita: Visitas = new Visitas();
  nombreProfesional = null;
  mensajeError = null;
  mensajeExito = null;
  fechaMinima = new Date();

  constructor(private planificarvisitaService : PlanificarvisitaService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('USR_IDPERFIL')) {
      let profesionalId = sessionStorage.getItem('USR_IDPERFIL');

      this.visita.VIS_ID_PRO = parseInt(profesionalId);

      this.planificarvisitaService.getCliente(profesionalId).subscribe((response) => {
        this.cliente = response[0];

        this.visita.VIS_ID_CLI = this.cliente.CLI_ID;
      }); 
    }

    if (sessionStorage.getItem('USR_NOMBRECOMPLETO'))
      this.nombreProfesional = sessionStorage.getItem('USR_NOMBRECOMPLETO');


    
  }

  crearVisita() {
    this.mensajeError = null;
    this.mensajeExito = null;
    this.planificarvisitaService.crearVisita(this.visita).subscribe((response) => {
      console.log('crearVisita: ', response);
      this.mensajeExito = 'Visita creada con éxito';

    }, (error) => {
      console.log('error: ', error);
      this.mensajeError = error.error;
    });
  }
}
