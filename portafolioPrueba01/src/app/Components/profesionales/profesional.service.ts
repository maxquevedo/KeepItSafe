import { Injectable } from '@angular/core';
import { Profesional } from './Profesional';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'



@Injectable({
  providedIn: 'root'
})
export class ProfesionalService {

  private env = environment;
  profesional:[];

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient ) { }

  getProfesionales(){
    return this.http.get(`${this.env.apiUrl}/web/profesional`)
  }

  getProfCli(){
    return this.http.get(`${this.env.apiUrl}/web/profesionalclientes`)
  }

  create(formateado){
    return this.http.post(`${this.env.apiUrl}/web/profesional`, formateado, {headers: this.httpHeaders})
  }

  getProfesional(USR_ID){
    return this.http.get(`${this.env.apiUrl}/web/profesional/${USR_ID}`);
  }

  update(USR_ID:string,profesional){
    return this.http.put(`${this.env.apiUrl}/web/profesional/${USR_ID}`,profesional);
  }

  delete(USR_ID: number){
    return this.http.delete(`${this.env.apiUrl}/web/usuario/${USR_ID}`);
  }

  }