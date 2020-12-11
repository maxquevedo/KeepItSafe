import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'
//import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class CrearCapacitacionService {

  private env = environment;
  capacitacion:[];

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient ) { }

  getCapacitaciones(){
    return this.http.get(`${this.env.apiUrl}/web/clientes`)
  }

  create(cliente: Cliente){
    return this.http.post(`${this.env.apiUrl}/web/clientes`,cliente)
  }

  getCliente(USR_ID){
    return this.http.get(`${this.env.apiUrl}/web/clientes/${USR_ID}`);
  }

  update(USR_ID:string,cliente: Cliente){
    return this.http.put(`${this.env.apiUrl}/web/Clienes/${USR_ID}`,Cliente);
  }

  delete(USR_ID: number){
    return this.http.delete(`${this.env.apiUrl}/${USR_ID}`, {headers: this.httpHeaders});
  }
  
  }