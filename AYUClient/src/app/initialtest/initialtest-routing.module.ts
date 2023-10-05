import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { initialtestcomponent } from './initialtest.component';

const routes: Routes = [
  {
    path: '',
    component: initialtestcomponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class initialtestPageRoutingModule {}
