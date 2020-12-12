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

  create(cliente: Cliente){
    return this.http.post(`${this.env.apiUrl}/web/clientes`,cliente)
  }

  getCliente(USR_ID){
    return this.http.get(`${this.env.apiUrl}/web/clientes${USR_ID}`);
  }

  update(USR_ID:string,cliente: Cliente){
    return this.http.put(`${this.env.apiUrl}/web/Clienes/${USR_ID}`,Cliente);
  }

  delete(USR_ID: number){
    return this.http.delete(`${this.env.apiUrl}/web/usuario/${USR_ID}`);
  }
  
  /*
    getClientes(): Observable<Cliente[]> {

      return this.http.get<Cliente[]>(this.env.apiUrl);
      }

      create(cliente: Cliente): Observable<Cliente>{
        return this.http.post<Cliente>(this.env.apiUrl, cliente, {headers: this.httpHeaders});
      }

      getCliente(USR_ID): Observable<Cliente>{
        return this.http.get<Cliente>(`${this.env.apiUrl}/${USR_ID}`);
      }

      update(cliente: Cliente): Observable<Cliente>{
        return this.http.put<Cliente>(`${this.env.apiUrl}/${cliente.USR_ID}`, cliente, {headers: this.httpHeaders});
      }

      delete(USR_ID: number): Observable<Cliente>{
        return this.http.delete<Cliente>(`${this.env.apiUrl}/${USR_ID}`, {headers: this.httpHeaders});
      }
*/
  }

