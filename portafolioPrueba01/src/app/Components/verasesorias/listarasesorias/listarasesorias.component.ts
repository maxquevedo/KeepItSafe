import { Component, OnInit } from '@angular/core';
import { Asesoria } from '../verasesorias'
import { VerasesoriasService } from '../verasesorias.service'
import { formatDate, DatePipe } from '@angular/common';

@Component({
  selector: 'app-listarasesorias',
  templateUrl: './listarasesorias.component.html',
  styleUrls: ['./listarasesorias.component.css']
})
export class ListarasesoriasComponent implements OnInit {

  asesoria : Asesoria;

  constructor(private verasesoriaService:VerasesoriasService) { }

  ngOnInit(): void {
    this.importAsesorias();
  }

  importAsesorias(){
    this.verasesoriaService.getAsesoria().subscribe(
      res => {
        this.asesoria = res;
        console.log("desde import :", res)
      },
      err => console.error(err)
    );
  }

}
