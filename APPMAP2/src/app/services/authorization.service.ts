import { Params } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from "../interfaces/user";
import { BehaviorSubject } from "rxjs";
import { Storage } from '@ionic/storage'
import { Router } from '@angular/router';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  authenticationState = new BehaviorSubject(false);

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'

    })
  }

  id;
  URL_API = 'http://127.0.0.1:8000/login/';

  constructor(
    private http: HttpClient,
    public storage: Storage,
    private router: Router,
    
    ) 
  {
    
  }

  //Loguearse
  consultarUsuarioIngreso(usuario: User) {
    this.http.post<User>(this.URL_API, usuario, this.httpOptions).subscribe( res => {
      this.iniciarSesionUsuario(res);
      console.log(res)
    }) 
  }

  //Token obtener
  obtenerToken() {
    return this.storage.get('token');
  }

  //IdUsuario obtener
  async obtenerIdUsuario() {
    this.id = await this.storage.get('id_user');
    console.log('usuarioId', this.id);
    return this.id;
  }
  
  //Username obtener
  async obtenerUsername(){
    return await this.storage.get('username');
  }
  //NombreUsuario obtener
  async obtenerNombreUsuario(){
    return await this.storage.get('nombreUsuario');
  }
  //Loguearse
  loginUser(userData): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.URL_API, userData);
  }

  //Envia datos de usuario al storage 
  iniciarSesionUsuario(usuario) {
    this.storage.set('token', usuario.token);
    this.storage.set('id_user', usuario.username.id_user);
    this.storage.set('username', usuario.username.username);
    this.storage.set('nombreUsuario', usuario.username.first_name);
  }

  //Cerrar Sesion de usuario
  cerrarSesionUsuario() {
    this.storage.clear();
    this.router.navigate(['/login']);
    // this.storage.remove('token');
    // this.storage.remove('id_user');
    // this.storage.remove('username');
    // this.storage.remove('nombreUsuario');

  }

  isAuthenticated(){
    return this.authenticationState.value;
  }
}
