import { Component, OnInit } from '@angular/core';
import { ReporteglobalService } from './reporteglobal.service';
import { Router} from '@angular/router';
import { Reporteglobal } from './reporteglobal';


@Component({
  selector: 'app-reporteglobal',
  templateUrl: './reporteglobal.component.html',
  styleUrls: ['./reporteglobal.component.css']
})
export class ReporteglobalComponent implements OnInit {

  reporteglobal: Reporteglobal;


  constructor(private ReporteglobalService: ReporteglobalService, private router: Router) { }

  ngOnInit(): void {
    this.ReporteglobalService.getReporteGlobal().subscribe( 
      res => this.ReporteGlobal(res),
      (err) => console.error(err)
    );
  }

  ReporteGlobal(res){
    this.reporteglobal = res;
    //console.log("desde getcliente",this.profesionales);
  }
}
