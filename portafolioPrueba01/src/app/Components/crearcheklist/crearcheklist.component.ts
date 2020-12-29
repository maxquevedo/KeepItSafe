import { Component, OnInit } from '@angular/core';
import { Accidentes } from './accidentes';
import { Cliente } from '../clientes/cliente';
import { CrearchecklistService } from './crearchecklist.service';

@Component({
  selector: 'app-crearcheklist',
  templateUrl: './crearcheklist.component.html',
  styleUrls: ['./crearcheklist.component.css']
})
export class CrearcheklistComponent implements OnInit {

  cliente: Cliente = new Cliente();
  accidente: Accidentes= new Accidentes();
  nombreProfesional = null;
  mensajeError = null;
  mensajeExito = null;
  constructor(private crearchecklistService : CrearchecklistService) { }


  ngOnInit(): void {

    if (sessionStorage.getItem('USR_IDPERFIL')) {
      let profesionalId = sessionStorage.getItem('USR_IDPERFIL');

      this.accidente.ACC_ID_PRO = parseInt(profesionalId);

      this.crearchecklistService.getCliente(profesionalId).subscribe((response) => {
        this.cliente = response[0];

        this.accidente.ACC_ID_CLIENTE = this.cliente.CLI_ID;
      }); 
    }

    if (sessionStorage.getItem('USR_NOMBRECOMPLETO'))
      this.nombreProfesional = sessionStorage.getItem('USR_NOMBRECOMPLETO');


  }
  crearAccidente() {
    this.mensajeExito = null;
    this.crearchecklistService.crearAccidente(this.accidente).subscribe((response) => {
      console.log('crearAccidente: ', response);
      this.mensajeExito = 'CheckList creada con éxito';

    }, (error) => {
      console.log('error: ', error);
      this.mensajeError = error.error;
    });
  }

}
