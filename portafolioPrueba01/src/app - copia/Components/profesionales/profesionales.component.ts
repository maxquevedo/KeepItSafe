import { Component, OnInit } from '@angular/core';
import { Profesional } from './Profesional';
import { Router} from '@angular/router';


import Swal from 'sweetalert2';
import { ProfesionalService } from './profesional.service';


@Component({
  selector: 'app-profesionales',
  templateUrl: './profesionales.component.html',
  styles: [
  ]
})
export class ProfesionalesComponent implements OnInit {

  profesionales: Profesional[];

  constructor(private profesionalService: ProfesionalService, private router: Router) { }

  ngOnInit(): void {
    this.profesionalService.getProfesional().subscribe(

      profesionales => this.profesionales = profesionales

  );
  }

  delete(profesional: Profesional): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: 'Estás Seguro?',
      text: `¿Seguro que deseas eliminar al Profesional ${profesional.nombres_profesional} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.profesionalService.delete(profesional.id_profesional).subscribe(
          response =>{
            this.profesionales = this.profesionales.filter(pro => pro !== profesional);
            swalWithBootstrapButtons.fire(
              'Profesional eliminado!',
              `Profesional ${profesional.nombres_profesional} Eliminado con éxito `,
              'success'
            );
          }
        );
      }
    });
  }

}
