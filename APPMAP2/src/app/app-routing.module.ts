import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'emergencia', loadChildren: './pages/emergencia/emergencia.module#EmergenciaPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'ficha-emergencia', loadChildren: './pages/ficha-emergencia/ficha-emergencia.module#FichaEmergenciaPageModule' },
<<<<<<< HEAD
  { path: 'retroalimentacion', loadChildren: './pages/retroalimentacion/retroalimentacion.module#RetroalimentacionPageModule' },
  { path: 'mapa', loadChildren: './pages/mapa/mapa.module#MapaPageModule' },
=======
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },




>>>>>>> 1be55e70dd4d11b66792fea2b812837932bc45da

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
