import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class RespondermejoraService {

  private env = environment;
  mejoras:[];

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getMejorasCli(MEJ_IDCLI:string){
    return this.http.get(`${this.env.apiUrl}/web/cli/mejoras/${MEJ_IDCLI}`)
  }

  updateAprobar(MEJ_ID:string,MEJ_RESP_CLI:string){
    console.log("te apuesto lo que querai: ", MEJ_RESP_CLI);
    return this.http.put(`${this.env.apiUrl}/web/cli/mejoras/aprobar/${MEJ_ID}/${MEJ_RESP_CLI}`, {headers: this.httpHeaders});
    
  }

  updateRechazar(MEJ_ID:string){
    return this.http.put(`${this.env.apiUrl}/web/cli/mejoras/rechazar/${MEJ_ID}`, {headers: this.httpHeaders});
    
  }

}
