import { Component, OnInit } from '@angular/core';
import { Profesional } from './Profesional';
import { ProfesionalService } from './profesional.service';
import { Router, ActivatedRoute } from '@angular/router';
import { formatDate, DatePipe } from '@angular/common';



@Component({
  selector: 'app-form-prof',
  templateUrl: './form-prof.component.html'
})
export class FormProfComponent implements OnInit {

  profesionales : Profesional;
  now = Date.now();
  params = this.activedRoute.snapshot.params;
  id = this.params.Profesional;
  

  pro: Profesional={

    PRO_RUT:'',
    PRO_ID:'',
    PRO_NOMBRE:'',
    PRO_APELLIDO:'',
    PRO_FINGRESO:'',
    PRO_CLI_ID:'',

    USR_ID: this.id,
    USR_USERNAME:'',
    USR_CORREO:'',
    USR_NOMBRECOMPLETO:'',
    USR_PASSWORD:'',
    USR_TIPOUSUARIO:'',
    USR_IDPERFIL:'',

  };
  constructor(public datepipe: DatePipe,private activedRoute: ActivatedRoute, private profesionalService: ProfesionalService, private router: Router, private activateRoute: ActivatedRoute) { }


  

  ngOnInit(): void {
    console.log("pro", this.pro);
    this.profesionalService.getProfesional(this.id).subscribe( 
      res => {
        this.pro = res;
      },
      err => console.error(err)
    );

    console.log("desde init:", this.params);
    console.log("desde id",this.id);
  }

  getProfesional(res){
    this.profesionales = res;
    //console.log("desde getcliente",this.profesionales);
  }

  GuardarProfesional(){

    var formateado = JSON.stringify({
      "id":this.id,
      "username":this.pro.USR_USERNAME,
      "password":this.pro.USR_PASSWORD,
      "email":this.pro.USR_CORREO,
      "rut":this.pro.PRO_RUT,
      "name":this.pro.PRO_NOMBRE,
      "apellido":this.pro.PRO_APELLIDO,
      "fechaingreso": this.datepipe.transform(this.now, 'dd/MM/yyyy')
  });

    if (this.id) {
      console.log("edita",formateado);
      this.profesionalService.update(this.pro.PRO_ID, formateado).subscribe(
        res => console.log(res),
        err => console.error(err)
      );
      
    } else {
      
    console.log("nuevo",formateado);
    this.profesionalService.create(formateado).subscribe(
      res => console.log(res),
      err => console.error(err)
    );
      
    }
 

}

}
