import { Component, OnInit } from '@angular/core';
import { Profesional } from './Profesional';
import { ProfesionalService } from './profesional.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';



@Component({
  selector: 'app-form-prof',
  templateUrl: './form-prof.component.html'
})
export class FormProfComponent implements OnInit {

  profesionales : Profesional;

  pro: Profesional={

    PRO_RUT:'',
    PRO_ID:'',
    PRO_NOMBRE:'',
    PRO_APELLIDO:'',
    PRO_FINGRESO:'',
    PRO_CLI_ID:'',

    USR_ID:'',
    USR_USERNAME:'',
    USR_CORREO:'',
    USR_NOMBRECOMPLETO:'',
    USR_PASSWORD:'',
    USR_TIPOUSUARIO:'',
    USR_IDPERFIL:'',

    

  };
  constructor(private activedRoute: ActivatedRoute, private profesionalService: ProfesionalService, private router: Router, private activateRoute: ActivatedRoute) { }

  params = this.activedRoute.snapshot.params;
  id = this.params.USR_ID;
  
  


  ngOnInit(): void {
    this.profesionalService.getProfesionales().subscribe( 
      /*(res:Cliente[]) => {
        this.clientes = res;
      },*/
      res => this.getProfesional(res),
      err => console.error(err)
    );

    console.log("desde init:" + this.params);
    console.log("desde id",this.id);
  }

  getProfesional(res){
    this.profesionales = res;
    //console.log("desde getcliente",this.profesionales);
  }

  GuardarProfesional(){
  var formateado = JSON.stringify({
      "username":this.pro.USR_USERNAME,
      "password":this.pro.USR_PASSWORD,
      "email":this.pro.USR_CORREO,
      "rut":this.pro.PRO_RUT,
      "name":this.pro.USR_NOMBRECOMPLETO,
      
  });
  console.log(formateado);
  //this.profesionalService.create(formateado);

}

}
