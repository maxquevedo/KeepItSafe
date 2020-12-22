import { Component, OnInit } from '@angular/core';
import { ResponderchecklistService } from './responderchecklist.service';
import { Router} from '@angular/router';
import { Accidente } from './accidente';

@Component({
  selector: 'app-responderchecklist',
  templateUrl: './responderchecklist.component.html',
  styleUrls: ['./responderchecklist.component.css']
})
export class ResponderchecklistComponent implements OnInit {

  accidente:Accidente;

  constructor() { }

  ngOnInit(): void {
  }

}
