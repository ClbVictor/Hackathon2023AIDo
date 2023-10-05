import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestulPage } from './testul.page';

const routes: Routes = [
  {
    path: '',
    component: TestulPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestulPageRoutingModule {}
