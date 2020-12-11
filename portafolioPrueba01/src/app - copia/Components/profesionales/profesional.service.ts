import { Injectable } from '@angular/core';
import { Profesional } from './Profesional';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ProfesionalService {

  private urlEndPoint:string = 'http://localhost:8090/api/profesional';


  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient ) { }

    getProfesional(): Observable<Profesional[]> {

      return this.http.get<Profesional[]>(this.urlEndPoint);
      }

      create(profesional: Profesional): Observable<Profesional>{
        return this.http.post<Profesional>(this.urlEndPoint, profesional, {headers: this.httpHeaders});
      }

      getCliente(id_profesional): Observable<Profesional>{
        return this.http.get<Profesional>(`${this.urlEndPoint}/${id_profesional}`);
      }

      update(profesional: Profesional): Observable<Profesional>{
        return this.http.put<Profesional>(`${this.urlEndPoint}/${profesional.id_profesional}`, profesional, {headers: this.httpHeaders});
      }

      delete(id_profesional: number): Observable<Profesional>{
        return this.http.delete<Profesional>(`${this.urlEndPoint}/${id_profesional}`, {headers: this.httpHeaders});
      }

  }