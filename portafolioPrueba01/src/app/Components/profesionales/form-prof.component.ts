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

  public profesional: Profesional = new Profesional();
  constructor(private profesionalService: ProfesionalService, private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.cargarProfesional();
  }

  cargarProfesional(): void {
    this.activateRoute.params.subscribe(params => {
      const id_profesional = params[ 'id_profesional']
      if (id_profesional){
        //this.profesionalService.getCliente(id_profesional).subscribe( (profesional) => this.profesional = profesional);
      }
    });
  }

/*

  create(): void{
  this.profesionalService.create(this.profesional)
  .subscribe( profesional => {
    this.router.navigate(['/profesionales']);
    swal.fire('Nuevo Profesional', `Profesional ${profesional.nombres_profesional} ${profesional.ap_paterno_prof} creado con exito!`, 'success');
  }
  );
}

update(): void{
  this.profesionalService.update(this.profesional).subscribe(
    profesional => {
      this.router.navigate(['/profesionales']);
      swal.fire('Profesional', `profesional ${profesional.nombres_profesional} ${profesional.ap_paterno_prof} actualizado con exito!`, 'success');
    }
  );

}
*/
}
