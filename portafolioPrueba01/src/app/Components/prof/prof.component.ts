import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from 'protractor';

@Component({
  selector: 'app-prof',
  templateUrl: './prof.component.html'
})
export class ProfComponent implements OnInit {

  usuario = sessionStorage.getItem('USR_USERNAME');

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout(){

    sessionStorage.clear();
    this.router.navigate(['/home']);
  }

}
