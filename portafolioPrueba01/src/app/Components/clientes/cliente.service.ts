import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cliente } from './cliente';
import { environment } from '../../../environments/environment'
import { Observable } from 'rxjs';
//import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private env = environment;
  clientes:[];

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient ) { }

  getClientes(){
    return this.http.get(`${this.env.apiUrl}/web/clientes`)
  }

  create(formateado){
    return this.http.post(`${this.env.apiUrl}/web/cliente`,formateado, {headers: this.httpHeaders})
  }

  getCliente(USR_ID){
    return this.http.get(`${this.env.apiUrl}/web/cliente/${USR_ID}`);
  }

  update(USR_ID:string,cliente){
    return this.http.put(`${this.env.apiUrl}/web/cliente/${USR_ID}`,cliente);
  }

  delete(USR_ID: number){
    return this.http.put(`${this.env.apiUrl}/web/usuario/${USR_ID}`,{headers: this.httpHeaders});
  }
  
  }

