import { Component, OnInit } from '@angular/core';
import { Capacitacion } from '../vercapacitaciones';
import { VercapacitacionesService} from '../vercapacitaciones.service'
import { formatDate, DatePipe } from '@angular/common';
@Component({
  selector: 'app-listarcapacitaciones',
  templateUrl: './listarcapacitaciones.component.html',
  styleUrls: ['./listarcapacitaciones.component.css']
})
export class ListarcapacitacionesComponent implements OnInit {

  capacitacion : Capacitacion;
  constructor(private vercapacitacionesService: VercapacitacionesService ) { }

  ngOnInit(): void {
    this.importCapacitaciones();
  }
  importCapacitaciones(){
    this.vercapacitacionesService.getCapacitaciones().subscribe(
      res => {
        this.capacitacion = res;
        console.log("desde import capacitacitacion :", res)
      },
      err => console.error(err)
    );
  }

}
