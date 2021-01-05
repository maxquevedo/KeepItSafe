import { Component, OnInit } from '@angular/core';
import { ResponderchecklistService } from './responderchecklist.service';
import { Router} from '@angular/router';
import { Accidentes } from './accidente';

@Component({
  selector: 'app-responderchecklist',
  templateUrl: './responderchecklist.component.html',
  styleUrls: ['./responderchecklist.component.css']
})
export class ResponderchecklistComponent implements OnInit {

  accidentes : Accidentes;

  constructor(private responderchecklistService:  ResponderchecklistService, private router: Router ) { }

  ngOnInit(): void {

    var profesionalId;
    if (sessionStorage.getItem('USR_IDPERFIL')) {
    profesionalId = sessionStorage.getItem('USR_IDPERFIL');
      
    }

    this.responderchecklistService.getAccidentes(profesionalId).subscribe( 
      res => this.getAccidentes(res),
      err => console.error(err)
    );
    
  }
  getAccidentes(res){
  
    this.accidentes = res;
    console.log(res);
  }
   editarAprobar(desc:string){
    var aprobado =sessionStorage.getItem('aprobados');
    aprobado+=', '+desc;
    sessionStorage.setItem('aprobados',aprobado)
    console.log(aprobado);
  }
  editarRechazar(desc:string){
    var rechazado =sessionStorage.getItem('rechazados');
    rechazado+=', '+desc;
    sessionStorage.setItem('rechazados',rechazado)
    console.log(rechazado);
  }
}
  /*editarAprobar(id:string){
    this.responderchecklistService.updateAprobar(id).subscribe( 
      res => console.log(res),
      err => console.error(err)
    );
    console.log(`desde editarChecklist:`,id);
    console.log(typeof(id));
    this.ngOnInit();

  }*/

