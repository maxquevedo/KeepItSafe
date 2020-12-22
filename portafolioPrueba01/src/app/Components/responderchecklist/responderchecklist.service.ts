import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { Accidente } from './accidente';


@Injectable({
  providedIn: 'root'
})
export class ResponderchecklistService {

  private env=environment;
  accidente:[];
  constructor(private http: HttpClient) { }
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
  getResponderChecklist(id_pro: number,id_cli:number){
    return this.http.get(`${this.env.apiUrl}/web/responderchecklist/:id_pro/:id_cli/`)
  }
}
