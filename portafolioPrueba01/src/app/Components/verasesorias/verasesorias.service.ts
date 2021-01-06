import { Injectable } from '@angular/core';
import { Asesoria } from './verasesorias';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class VerasesoriasService {
  private env = environment;
  asesorias:[];
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient ) { }

  getAsesorias(){
    return this.http.get(`${this.env.apiUrl}/web/asesorias`)
  }

  create(formateado){
    return this.http.post(`${this.env.apiUrl}/web/solasesoria`, formateado, {headers: this.httpHeaders})
  }

  update(SOL_ID:string,asesoria){
    return this.http.put(`${this.env.apiUrl}/web/solasesoria/${SOL_ID}`,asesoria, {headers: this.httpHeaders});
  }

}
