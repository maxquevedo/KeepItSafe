import { Injectable } from '@angular/core';
import { Asesorias } from './asesorias';
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

}
