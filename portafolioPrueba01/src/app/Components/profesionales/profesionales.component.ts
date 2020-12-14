import { Component, OnInit } from '@angular/core';
import { Profesional } from './Profesional';
import { Router} from '@angular/router';
import { ProfesionalService } from './profesional.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profesionales',
  templateUrl: './profesionales.component.html',
  styles: [
  ]
})
export class ProfesionalesComponent implements OnInit {

  profesionales: Profesional;


  constructor(private profesionalService: ProfesionalService, private router: Router) { }

  ngOnInit(): void {
    this.profesionalService.getProfesionales().subscribe( 
      /*(res:Cliente[]) => {
        this.clientes = res;
      },*/
      res => this.getProfesional(res),
      err => console.error(err)
    );
  }

  getProfesional(res){
    this.profesionales = res;
    //console.log("desde getcliente",this.profesionales);
  }

  asignarpro(profesional: Profesional){
    console.log(`desde asignarpro: ${profesional.USR_ID}`);
    this.router.navigate([`/asignar/${profesional.USR_NOMBRECOMPLETO}`]);
  }
  editar(profesional: Profesional){
    console.log(`desde asignarpro: ${profesional.PRO_ID}`);
    this.router.navigate([`profesionales/form-prof/${Profesional}`]);
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
      text: `¿Seguro que deseas eliminar al Profesional ${profesional.USR_NOMBRECOMPLETO} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.profesionalService.delete(profesional.USR_ID).subscribe(
          response =>{
            this.ngOnInit();
            //this.profesionales = this.profesionales.filter(pro => pro !== profesional);
            swalWithBootstrapButtons.fire(
              'Profesional eliminado!',
              `Profesional ${profesional.USR_NOMBRECOMPLETO} Eliminado con éxito `,
              'success'
            );
          }
        );
      }
    });
  }

}
