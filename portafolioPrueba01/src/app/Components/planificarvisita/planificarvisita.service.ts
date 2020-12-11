import { Injectable } from '@angular/core';
import { Cliente } from '../clientes/cliente';
import { environment } from '../../../environments/environment'
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PlanificarvisitaService {

  private env = environment;
  clientes:[];
  profesional:[];

  constructor(private http: HttpClient) { }

  getClientes(){
    return this.http.get(`${this.env.apiUrl}/web/clientes`)
  }
  
  getProfesionales(){
    return this.http.get(`${this.env.apiUrl}/web/profesional`)
  }

  

}
