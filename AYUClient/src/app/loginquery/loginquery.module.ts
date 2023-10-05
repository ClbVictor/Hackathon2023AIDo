import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginqueryPageRoutingModule } from './loginquery-routing.module';

import { LoginqueryPage } from './loginquery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginqueryPageRoutingModule
  ],
  declarations: [LoginqueryPage]
})
export class LoginqueryPageModule {}
