import { Component, OnInit } from '@angular/core';
import { Asesoria } from './verasesorias'
import { VerasesoriasService } from './verasesorias.service'
import { formatDate, DatePipe } from '@angular/common';


@Component({
  selector: 'app-verasesorias',
  templateUrl: './verasesorias.component.html',
  styleUrls: ['./verasesorias.component.css']
})
export class VerasesoriasComponent implements OnInit {

  asesoria : Asesoria;

  constructor( private verasesoriaService: VerasesoriasService, private datepipe:DatePipe ) { }

  
  ngOnInit(): void {
    this.verasesoriaService.getAsesorias().subscribe( 
      res => this.getAsesorias(res),
      err => console.error(err)
    );
  }

  aprobar(){

    var formateado = JSON.stringify({
      
      "tipo": this.asesoria.SOL_PRO_ID,
      "id_usuario": this.asesoria.SOL_CLI_ID,
      "id_pro": this.asesoria.SOL_PRO_ID
    });
    console.log("formato: ",formateado);

  /*   this.verasesoriaService.create(formateado).subscribe(
      res=> console.log("nueva asesoria",res),
      err=> console.error(err)
    ) */

  }

  getAsesorias(res){
    this.asesoria = res;
    //let fecha = new Date (res.ASE_FECHA.toLocaleDateString());
    //this.asesoria.ASE_FECHA = fecha;
    console.log("desde getAsesoria",res);
  }

}
