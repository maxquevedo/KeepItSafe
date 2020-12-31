import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ControlarPagosClienteService {
  private env = environment;

  constructor(private http: HttpClient) { }

  obtenerPagos(request) {
    return this.http.post(this.env.apiUrl + '/web/obtenerPagos', request);
  }

  generarFacturas(request) {
    return this.http.post(this.env.apiUrl + '/web/generarFacturas', request);
  }

  validarPago(request) {
    return this.http.post(this.env.apiUrl + '/web/validarPago', request);
  }

  obtenerDetalleFactura(request) {
    return this.http.post(this.env.apiUrl + '/web/obtenerDetalleFactura', request);
  }
}
