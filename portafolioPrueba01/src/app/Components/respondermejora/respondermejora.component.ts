import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {RespondermejoraService} from './respondermejora.service';
import {Mejoras} from './mejoras';

@Component({
  selector: 'app-respondermejora',
  templateUrl: './respondermejora.component.html',
  styleUrls: ['./respondermejora.component.css']
})
export class RespondermejoraComponent implements OnInit {

  mejoras : Mejoras;
  constructor(private respondermejoraService: RespondermejoraService, private router: Router) { }

  ngOnInit(): void {
    var clienteId;
    if (sessionStorage.getItem('USR_IDPERFIL')) {
      clienteId = sessionStorage.getItem('USR_IDPERFIL');
      
    }

    this.respondermejoraService.getMejorasCli(clienteId).subscribe( 
      res => this.getMejorasCli(res),
      err => console.error(err)
    );
    
  }


  getMejorasCli(res){
  
    this.mejoras = res;
    
  }
   editarAprobar(id:string,resp:string){
    this.respondermejoraService.updateAprobar(id,resp).subscribe( 
      res => console.log(res),
      err => console.error(err)
    );
    console.log(`desde editarMejoraCliente:`,id);
    console.log(typeof(id));
    console.log(resp);
    this.ngOnInit();

  }

  editarRechazar(id:string){
    this.respondermejoraService.updateRechazar(id).subscribe( 
      res => console.log(res),
      err => console.error(err)
    );
    console.log(`desde editarRechazarCli:`,id);
    console.log(typeof(id));
    this.ngOnInit();
  
  } 

}
