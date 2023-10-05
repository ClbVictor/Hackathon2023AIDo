import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginqueryPage } from './loginquery.page';

const routes: Routes = [
  {
    path: '',
    component: LoginqueryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginqueryPageRoutingModule {}
