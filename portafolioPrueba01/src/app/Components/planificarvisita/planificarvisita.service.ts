import { Injectable } from '@angular/core';
import { Cliente } from '../clientes/cliente';
import { environment } from '../../../environments/environment'
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PlanificarvisitaService {

  private env = environment;

  constructor(private http: HttpClient) { }

  getCliente(idProfesional){
    return this.http.get(`${this.env.apiUrl}/web/cliente/${idProfesional}`);
  }

  crearVisita(visita){
    return this.http.post(`${this.env.apiUrl}/web/visitas`, visita);
  }

}
