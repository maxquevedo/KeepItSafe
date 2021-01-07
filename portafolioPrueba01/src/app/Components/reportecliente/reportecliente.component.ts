import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
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
  accidentabilidad;
  clientes : Cliente;
  opcionSeleccionado: string  = '0';
  verSeleccion: string        = '';
  constructor(private reporteclienteservice : ReporteclienteService, private clienteServices : ClienteService) { }

  ngOnInit(): void {
      this.importClientes();
      this.importReportes();
      console.log("desde OnInit: ", this.reporteCliente);
    }
    capturar() {
      this.verSeleccion = this.opcionSeleccionado;
    }
    calcular(id){
      console.log("id: ",id)
      this.reporteclienteservice.getaccidentabilidad(id).subscribe(
        res => {
          this.accidentabilidad = res;
          console.log("respuesta API: ",res)
        
        },
        err => console.error(err)

      )

    }

    importClientes(){
      this.clienteServices.getClientes().subscribe(
        res => this.clientes = res,
        err=> console.error(err)
      )
    }

    importReportes(){

      this.reporteclienteservice.getReporteClientes().subscribe(
        res => {
          this.reporteCliente = res;
          console.log("desde ImportReportes: ",res);
        },
        err => console.log(err)
    );

    }
    generarReporte(cliId){
      console.log("id cliente:" ,cliId);
      this.reporteclienteservice.getReporteCliente(cliId).subscribe(
        res => { 
          this.reporteCliente = res;
          console.log("Rep Cliente: ", res);
          
        },
        err => console.error(err)        
      )
      this.ngOnInit();
    }


  }


