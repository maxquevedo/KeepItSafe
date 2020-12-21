import { Component, OnInit } from '@angular/core';
import { Asesoria } from './verasesorias'
import { VerasesoriasService } from './verasesorias.service'

@Component({
  selector: 'app-verasesorias',
  templateUrl: './verasesorias.component.html',
  styleUrls: ['./verasesorias.component.css']
})
export class VerasesoriasComponent implements OnInit {

  asesoria : Asesoria;

  constructor( private verasesoriaService: VerasesoriasService ) { }

  
  ngOnInit(): void {
    this.verasesoriaService.getAsesorias().subscribe( 
      res => this.getAsesorias(res),
      err => console.error(err)
    );
  }

  getAsesorias(res){
  
    this.asesoria = res;
    //let fecha = new Date (res.ASE_FECHA.toLocaleDateString());
    //this.asesoria.ASE_FECHA = fecha;
    console.log("desde getAsesoria",res.ASE_FECHA);
  }

}
