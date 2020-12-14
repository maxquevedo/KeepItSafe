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
    console.log("desde getAsesoria",this.asesoria);
  }

}
