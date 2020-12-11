import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  usuario = sessionStorage.getItem('USR_USERNAME');
  perfil = sessionStorage.getItem('USR_TIPOUSUARIO');

  constructor() { }


  ngOnInit(): void {
  }

}
