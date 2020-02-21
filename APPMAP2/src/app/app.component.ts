import { Router } from '@angular/router';
import { AuthorizationService } from './services/authorization.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authorizationService: AuthorizationService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
      this.authorizationService.authenticationState.subscribe(state => {
        console.log('Auth Changed:', state);
        if (state) {
          this.router.navigate(['home'])
        } else {
          this.router.navigate(['login']);
        }
      });
    });
  }
}
