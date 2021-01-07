import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Capacitacion } from './vercapacitaciones';

@Injectable({
  providedIn: 'root'
})
export class VercapacitacionesService {

  private env = environment;
  capacitaciones:[];
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient ) { }

  getCapacitaciones(){
    return this.http.get(`${this.env.apiUrl}/web/capacitaciones`)
  }

 /*  getAsesoria(){
    return this.http.get(`${this.env.apiUrl}/web/asesoria`)
  }

  create(formateado){
    return this.http.post(`${this.env.apiUrl}/web/solasesoria`, formateado, {headers: this.httpHeaders})
  }

  update(SOL_ID:string,asesoria){
    return this.http.put(`${this.env.apiUrl}/web/solasesoria/${SOL_ID}`,asesoria, {headers: this.httpHeaders});
  } */
}
