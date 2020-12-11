import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint:string = 'http://localhost:8090/api/clientes';


  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient ) { }

    getClientes(): Observable<Cliente[]> {

      return this.http.get<Cliente[]>(this.urlEndPoint);
      }

      create(cliente: Cliente): Observable<Cliente>{
        return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders});
      }

      getCliente(id_cliente): Observable<Cliente>{
        return this.http.get<Cliente>(`${this.urlEndPoint}/${id_cliente}`);
      }

      update(cliente: Cliente): Observable<Cliente>{
        return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id_cliente}`, cliente, {headers: this.httpHeaders});
      }

      delete(id_cliente: number): Observable<Cliente>{
        return this.http.delete<Cliente>(`${this.urlEndPoint}/${id_cliente}`, {headers: this.httpHeaders});
      }

  }

