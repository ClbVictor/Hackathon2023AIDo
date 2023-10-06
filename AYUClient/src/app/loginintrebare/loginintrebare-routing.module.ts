import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {  LoginintrebarePage } from './loginintrebare.page';

const routes: Routes = [
  {
    path: '',
    component: LoginintrebarePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginintrebarePageRoutingModule {}
