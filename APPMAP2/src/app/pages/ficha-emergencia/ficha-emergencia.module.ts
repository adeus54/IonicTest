import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FichaEmergenciaPage } from './ficha-emergencia.page';

const routes: Routes = [
  {
    path: '',
    component: FichaEmergenciaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FichaEmergenciaPage]
})
export class FichaEmergenciaPageModule {}
