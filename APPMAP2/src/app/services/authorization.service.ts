import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor() {
    
  }
  getMensaje() { 
    console.log('funcionando servicio getMensaje')
  }
}
