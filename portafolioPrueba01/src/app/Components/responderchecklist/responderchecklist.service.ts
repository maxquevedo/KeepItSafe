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
 
}
