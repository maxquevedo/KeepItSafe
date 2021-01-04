import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VisualizarActividadesService {
  private env = environment;

  constructor(private http: HttpClient) {

  }
  obtenerActividades(filtros){
    return this.http.post(`${this.env.apiUrl}/web/obtenerActividades/`, filtros);
  }

  getClientes(){
    return this.http.get(`${this.env.apiUrl}/web/clientes/`);
  }

}
