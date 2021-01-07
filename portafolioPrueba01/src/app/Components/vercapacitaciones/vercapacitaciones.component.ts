import { Component, OnInit } from '@angular/core';
import { Capacitacion } from './vercapacitaciones';
import {VercapacitacionesService} from './vercapacitaciones.service'
import { formatDate, DatePipe } from '@angular/common';

@Component({
  selector: 'app-vercapacitaciones',
  templateUrl: './vercapacitaciones.component.html',
  styleUrls: ['./vercapacitaciones.component.css']
})
export class VercapacitacionesComponent implements OnInit {

  solicitud : Capacitacion;
  capacitacion : Capacitacion;

  solicitudes: Capacitacion ={

    SOL_CLI_ID:'',
    SOL_PRO_ID:'',
    SOL_TIPO:'',
    SOL_FECHA:'',

  };

  constructor(private vercapacitacionesService: VercapacitacionesService, private datepipe:DatePipe, ) { }

  ngOnInit(): void {
    this.vercapacitacionesService.getCapacitaciones().subscribe( 
      res => this.getCapacitaciones(res),
      err => console.error(err)
    );
    this.importCapacitaciones();
  }
  importCapacitaciones(){
    this.vercapacitacionesService.getCapacitaciones().subscribe(
      res => this.capacitacion = res,
      err => console.error(err)
    );
  }
  getCapacitaciones(res){
    this.solicitud = res;
    //let fecha = new Date (res.ASE_FECHA.toLocaleDateString());
    //this.asesoria.ASE_FECHA = fecha;
    console.log("desde getCapacitaciones",res);
  }

}
