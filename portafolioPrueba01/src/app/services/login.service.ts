import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Usuario} from '../models/Ususario'
import { from } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private env = environment;
  

  constructor(private http:HttpClient) { }

  getPrueba(){
    return this.http.get(`${this.env.apiUrl}/prueba`);
  }

  getLogin(username, password){
    return this.http.get(`${this.env.apiUrl}/web/login/${username}/${password}`);
  }

  getUsuarios(){
    return this.http.get(`${this.env.apiUrl}/web/usuarios`)
  }

  getUsuario(username: string){
    return this.http.get(`${this.env.apiUrl}/web/usuario/${username}`)
  }


}
