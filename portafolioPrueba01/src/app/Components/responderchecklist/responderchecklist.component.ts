import { Component, OnInit } from '@angular/core';
import { ResponderchecklistService } from './responderchecklist.service';
import { Router} from '@angular/router';
import { Accidentes } from './accidente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-responderchecklist',
  templateUrl: './responderchecklist.component.html',
  styleUrls: ['./responderchecklist.component.css']
})
export class ResponderchecklistComponent implements OnInit {
  marked = false;
  accidentes : Accidentes;
  estado: any='';
  ac: Accidentes={

    ACC_ID : '',
    ACC_DESCRIPCION: '',
    ACC_ID_CLIENTE: '',
    ACC_ID_PRO: '',
    ACC_ESTADO: this.estado

  };

  

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
  toggleVisibility(e){
    this.marked= e.target.checked;
    console.log("MARKED: ",this.marked);
  }

  getAccidentes(res){
  
    this.ac = res;
    console.log(res);
  }
   editarAprobar(desc:string){
    this.estado="Y";
    var aprobado =sessionStorage.getItem('aprobados');
    aprobado+=', '+desc;
    sessionStorage.setItem('aprobados',aprobado)
    console.log("APROBADO :",aprobado);
    console.log("ESTADO: ",this.estado);
   
  }
  editarRechazar(desc:string){
    var rechazado =sessionStorage.getItem('rechazados');
    rechazado+=', '+desc;
    sessionStorage.setItem('rechazados',rechazado)
    console.log(rechazado);
  }

  importAccidentes(){
    var profesionalId;
    if (sessionStorage.getItem('USR_IDPERFIL')) {
    profesionalId = sessionStorage.getItem('USR_IDPERFIL');
      
    }

    this.responderchecklistService.getAccidentes(profesionalId).subscribe( 
      res => this.getAccidentes(res),
      err => console.error(err)
    );
  }
  generarInforme(): void{
    var largo=Object.keys(this.ac);
    console.log("TypeoF: ", typeof(largo));
    //var largo=this.ac.lenght.then(largo => console.log(largo));
    console.log("Algo mas: ", largo);
    var template=`REPORTE DE VISITA \n\n`;
    var estado;
    for(let key in this.ac){
      estado=this.ac[key].ACC_CHECK;
      if(estado==true){
        estado="Aprobado"
      }
      else if(estado==undefined){
        estado="Fallido"
      }
      else{
        estado="Fallido"
      }
      template+=`\n ${this.ac[key].ACC_DESCRIPCION} : ${estado}\n`

      console.log(this.ac.ACC_DESCRIPCION);
      console.log(this.ac.ACC_CHECK);
      console.log("KEY: " ,this.ac[key]);
      console.log(template);
    }
    
    console.log(template);

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: `${template}`,
      text: ``,
      icon: 'info'
    })
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

