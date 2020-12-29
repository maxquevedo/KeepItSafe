import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrearchecklistService {

  private env = environment;

  constructor(private http: HttpClient) { }

  getCliente(idProfesional){
    return this.http.get(`${this.env.apiUrl}/web/cliente/${idProfesional}`);
  }

  crearAccidente(accidente){
    return this.http.post(`${this.env.apiUrl}/web/accidentes`, accidente);
  }
}
