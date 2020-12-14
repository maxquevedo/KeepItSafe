import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class ReporteclienteService {

  private env = environment;

  constructor(private http : HttpClient) { }
  
  getReporteClientes(){
    return this.http.get(`${this.env.apiUrl}/web/reporteclientes`)
  }

  getReporteCliente(id){
    return this.http.get(`${this.env.apiUrl}/web/reportecliente/:id`)
  }

}
