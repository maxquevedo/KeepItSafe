import { Component, OnInit } from '@angular/core';
import { ReporteclienteService } from "./reportecliente.service";
import { Reportecliente } from './reportecliente';
import { Cliente } from '../clientes/cliente';
import { ClienteService } from '../clientes/cliente.service'

@Component({
  selector: 'app-reportecliente',
  templateUrl: './reportecliente.component.html',
  styleUrls: ['./reportecliente.component.css']
})
export class ReporteclienteComponent implements OnInit {

  reporteCliente : Reportecliente;
  clientes : Cliente;
  opcionSeleccionado: string  = '0';
  verSeleccion: string        = '';
  constructor(private reporteclienteservice : ReporteclienteService, private clienteServices : ClienteService) { }

  ngOnInit(): void {
    this.importClientes();
    }

    generarReporte(cliId){
      console.log("id cliente:" ,cliId);
      this.importReportes(cliId)
    }

    capturar() {
      this.verSeleccion = this.opcionSeleccionado;
    }

    importClientes(){
      this.clienteServices.getClientes().subscribe(
        res => this.clientes = res,
        err=> console.error(err)
      )
    }

    importReportes(cliId){
      this.reporteclienteservice.getReporteClientes(cliId).subscribe(
        res => {
          this.reporteCliente = res;
          console.log(res);
        },
        err => console.log(err)
    );

    }


  }


