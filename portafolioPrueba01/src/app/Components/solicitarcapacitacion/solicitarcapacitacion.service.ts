import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SolicitarcapacitacionService {
  private env = environment;

  constructor(private http: HttpClient) { }

  getProfesional(idCliente){
    return this.http.get(`${this.env.apiUrl}/web/solicitud/profesional/${idCliente}`);
  }

  crearSolicitud(solicitud){
    return this.http.post(`${this.env.apiUrl}/web/solicitudes/capacitacion`, solicitud);
  }
}
