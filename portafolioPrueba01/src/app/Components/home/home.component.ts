import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor(private loginService: LoginService , private router: Router) { }

ngOnInit(): void {

  if (sessionStorage.getItem('USR_TIPOUSUARIO')) {
    this.router.navigate([sessionStorage.getItem('USR_TIPOUSUARIO')])
  }
    
  }

  getLogin(username, password){
    
    this.loginService.getLogin(username, password).subscribe(
      res => this.getUsuarios(res),
      err => console.error(err));

  }

  getUsuarios(res) {
    console.log(res);
    sessionStorage.setItem('USR_ID', res[0][0]);
    sessionStorage.setItem('USR_USERNAME', res[0][1]);
    sessionStorage.setItem('USR_CORREO', res[0][2]);
    sessionStorage.setItem('USR_NOMBRECOMPLETO', res[0][3]);
    sessionStorage.setItem('USR_PASSWORD', res[0][4]);
    sessionStorage.setItem('USR_TIPOUSUARIO', res[0][5]);
    sessionStorage.setItem('USR_IDPERFIL', res[0][6]);
    var session = sessionStorage.getItem('USR_ID');
    var usersession = sessionStorage.getItem('USR_USERNAME');
    this.router.navigate([sessionStorage.getItem("USR_TIPOUSUARIO")]);
   
    
    
  }

// tslint:disable-next-line:typedef
/*buscarRol( password: string, user: string  ){
    if (password === '1234' && user === 'cristian'){
      this.router.navigate(['administrador']);
    } else if (password === '5678' && user === 'belen'){
      this.router.navigate(['cli']);
    } else if (password === 'qwerty' && user === 'guillermo'){
      this.router.navigate(['prof']);
    }else {
      
  }
  }
  */
}
