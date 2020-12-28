import { Component, OnInit } from '@angular/core';
import { Mejoras } from './mejoras';
import { Cliente } from '../clientes/cliente';
import { IngresaractividaddemejoraService } from './ingresaractividaddemejora.service';

@Component({
  selector: 'app-ingresaractividaddemejora',
  templateUrl: './ingresaractividaddemejora.component.html',
  styleUrls: ['./ingresaractividaddemejora.component.css']
})
export class IngresaractividaddemejoraComponent implements OnInit {

  cliente: Cliente = new Cliente();
  mejora: Mejoras = new Mejoras();
  nombreProfesional = null;
  mensajeError = null;
  mensajeExito = null;
  constructor(private ingresaractividaddemejoraService : IngresaractividaddemejoraService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('USR_IDPERFIL')) {
      let profesionalId = sessionStorage.getItem('USR_IDPERFIL');

      this.mejora.MEJ_IDPRO = parseInt(profesionalId);

      this.ingresaractividaddemejoraService.getCliente(profesionalId).subscribe((response) => {
        this.cliente = response[0];

        this.mejora.MEJ_IDCLI = this.cliente.CLI_ID;
      }); 
    }

    if (sessionStorage.getItem('USR_NOMBRECOMPLETO'))
      this.nombreProfesional = sessionStorage.getItem('USR_NOMBRECOMPLETO');


  }
  crearMejora() {
    this.mensajeExito = null;
    this.ingresaractividaddemejoraService.crearMejora(this.mejora).subscribe((response) => {
      console.log('crearMejora: ', response);
      this.mensajeExito = 'Mejora creada con éxito';

    }, (error) => {
      console.log('error: ', error);
      this.mensajeError = error.error;
    });
  }

}
