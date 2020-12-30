import { Injectable } from '@angular/core';
import { Mejoras } from './revisarmejora';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class RevisaractividadmejoraService {

  private env = environment;
  mejoras:[];

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getMejoras(MEJ_IDPRO:string){
    return this.http.get(`${this.env.apiUrl}/web/mejoras/${MEJ_IDPRO}`)
  }

  updateAprobar(MEJ_ID:string){
    return this.http.put(`${this.env.apiUrl}/web/mejoras/aprobar`,MEJ_ID, {headers: this.httpHeaders});
    
  }
  updateRechazar(MEJ_ID:string){
    return this.http.put(`${this.env.apiUrl}/web/mejoras/rechazar`,MEJ_ID, {headers: this.httpHeaders});
  }
}
