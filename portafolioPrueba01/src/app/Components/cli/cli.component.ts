import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cli',
  templateUrl: './cli.component.html'
})
export class CliComponent implements OnInit {
  usuario = sessionStorage.getItem('USR_USERNAME');

  constructor(private router: Router) { }


  ngOnInit(): void {
  }

  logout(){

    sessionStorage.clear();
    this.router.navigate(['/home']);
  }

}
