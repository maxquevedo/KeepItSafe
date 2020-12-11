import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styles: [
  ]
})
export class AdministradorComponent implements OnInit {

  usuario = sessionStorage.getItem('USR_USERNAME');

  constructor(private router: Router) {
    
   }

  ngOnInit(): void {
    
  }


  logout(){

    sessionStorage.clear();
    this.router.navigate(['/home']);
  }


}
