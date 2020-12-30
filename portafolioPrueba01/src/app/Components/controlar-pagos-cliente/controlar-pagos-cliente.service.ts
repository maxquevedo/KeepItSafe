import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ControlarPagosClienteService {

  constructor(private http: HttpClient) { }

  obtenerPagos(request) {
    return this.http.post('', request);
  }

  generarFacturas(request) {
    return this.http.post('', request);
  }

  validarPago(request) {
    return this.http.post('', request);
  }
}
