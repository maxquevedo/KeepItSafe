import { Component, OnInit } from '@angular/core';
import { Mejoras } from './revisarmejora';
import { RevisaractividadmejoraService } from './revisaractividadmejora.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-revisaractividadmejora',
  templateUrl: './revisaractividadmejora.component.html',
  styleUrls: ['./revisaractividadmejora.component.css']
})
export class RevisaractividadmejoraComponent implements OnInit {

  mejoras : Mejoras;
  constructor(private revisaractividadmejoraService: RevisaractividadmejoraService, private router: Router) { }

  ngOnInit(): void {
    var profesionalId;
    if (sessionStorage.getItem('USR_IDPERFIL')) {
    profesionalId = sessionStorage.getItem('USR_IDPERFIL');
      
    }

    this.revisaractividadmejoraService.getMejoras(profesionalId).subscribe( 
      res => this.getMejoras(res),
      err => console.error(err)
    );
    
  }


  getMejoras(res){
  
    this.mejoras = res;
    
  }
  editarAprobar(id:string){
    this.revisaractividadmejoraService.updateAprobar(id).subscribe( 
      res => console.log(res),
      err => console.error(err)
    );
    console.log(`desde editarMejora:`,id);
    console.log(typeof(id));
    this.ngOnInit();

  }

  editarRechazar(id:string){
    this.revisaractividadmejoraService.updateRechazar(id).subscribe( 
      res => console.log(res),
      err => console.error(err)
    );
    console.log(`desde editarRechazar:`,id);
    console.log(typeof(id));
    this.ngOnInit();
  
  }
}
