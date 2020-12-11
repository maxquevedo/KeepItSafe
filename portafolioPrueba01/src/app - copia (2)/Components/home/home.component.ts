import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

ngOnInit(): void {
  }

// tslint:disable-next-line:typedef
buscarRol( password: string, user: string  ){
    if (password === '1234' && user === 'cristian'){
      this.router.navigate(['administrador']);
    } else if (password === '5678' && user === 'belen'){
      this.router.navigate(['cli']);
    } else if (password === 'qwerty' && user === 'guillermo'){
      this.router.navigate(['prof']);
    }else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Usuario o contraseña incorrectos!'
      });
  }
  }
}
