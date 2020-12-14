import { Component, OnInit } from '@angular/core';
import { ReporteclienteService } from "./reportecliente.service";
import { Reportecliente } from './reportecliente';

@Component({
  selector: 'app-reportecliente',
  templateUrl: './reportecliente.component.html',
  styleUrls: ['./reportecliente.component.css']
})
export class ReporteclienteComponent implements OnInit {

  reporteCliente : Reportecliente;
  constructor(private reporteclienteservice : ReporteclienteService) { }

  ngOnInit(): void {
    this.reporteclienteservice.getReporteClientes().subscribe(
        res => this.getReportecli(res),
        err => console.log(err)
    );

    }

    getReportecli(res){ 
        this.getReportecli = res;
        console.log("desde getreportecli",res);
     }

  }


