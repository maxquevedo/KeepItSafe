import { Component, OnInit } from '@angular/core';
import { Solicitudes } from './solicitudes';
import { Profesional } from '../profesionales/profesional';
import { SolicitarcapacitacionService } from './solicitarcapacitacion.service';
import { Cliente } from '../clientes/cliente';

@Component({
  selector: 'app-solicitarcapacitacion',
  templateUrl: './solicitarcapacitacion.component.html',
  styleUrls: ['./solicitarcapacitacion.component.css']
})
export class SolicitarcapacitacionComponent implements OnInit {

  
  profesional: Profesional;
  solicitud: Solicitudes = new Solicitudes ();
  nombreCliente = null;
  mensajeError = null;
  mensajeExito = null;
  fechaMinima  = (new Date()).setDate(new Date().getDate() + 15);
  
  constructor(private solicitarcapacitacionService : SolicitarcapacitacionService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('USR_IDPERFIL')) {
      let clienteId = sessionStorage.getItem('USR_IDPERFIL');

      this.solicitud.SOL_CLI_ID = parseInt(clienteId);

      this. solicitarcapacitacionService.getProfesional(clienteId).subscribe((response) => {
        this.profesional = response;
        console.log(response);

        this.solicitud.SOL_PRO_ID = this.profesional.PRO_ID;
      }); 
    }

    if (sessionStorage.getItem('USR_NOMBRECOMPLETO'))
      this.nombreCliente = sessionStorage.getItem('USR_NOMBRECOMPLETO');


  }
  crearSolicitud() {

    
    this.mensajeExito = null;
    this.solicitarcapacitacionService.crearSolicitud(this.solicitud).subscribe((response) => {
      console.log('crearSolicitud: ', this.solicitud);
      this.mensajeExito = 'Solicitud enviada con éxito';

    }, (error) => {
      console.log('error: ', error);
      this.mensajeError = error.error;
    });
  }

}
