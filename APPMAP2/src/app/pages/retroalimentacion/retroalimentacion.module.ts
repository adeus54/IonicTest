import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RetroalimentacionPage } from './retroalimentacion.page';

const routes: Routes = [
  {
    path: '',
    component: RetroalimentacionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RetroalimentacionPage]
})
export class RetroalimentacionPageModule {}
