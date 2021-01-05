import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { Accidentes } from './accidente';


@Injectable({
  providedIn: 'root'
})
export class ResponderchecklistService {

  private env=environment;
  accidentes:[];

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  
  getAccidentes(ACC_ID_PRO:string){
    return this.http.get(`${this.env.apiUrl}/web/responderchecklist/${ACC_ID_PRO}`)
  }

  updateAprobar(ACC_ID:string){
    return this.http.put(`${this.env.apiUrl}/web/responderchecklist/aprobar/${ACC_ID}`, {headers: this.httpHeaders});
    
  }
  updateRechazar(ACC_ID:string){
    return this.http.put(`${this.env.apiUrl}/web/responderchecklist/rechazar/${ACC_ID}`, {headers: this.httpHeaders});
    
  }
 
}
