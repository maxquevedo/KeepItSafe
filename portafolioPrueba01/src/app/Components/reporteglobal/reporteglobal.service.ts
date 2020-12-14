import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { Reporteglobal } from './reporteglobal'

@Injectable({
  providedIn: 'root'
})
export class ReporteglobalService {

  private env=environment;
  reportglobal:[];

  constructor(private http: HttpClient) { }
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  getReporteGlobal(){
    return this.http.get(`${this.env.apiUrl}/web/reporteglobal`)
  }
}
