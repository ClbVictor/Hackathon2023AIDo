import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginintrebarePageRoutingModule } from './loginintrebare-routing.module';

import { LoginintrebarePage } from './loginintrebare.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginintrebarePageRoutingModule
  ],
  declarations: [LoginintrebarePage]
})
export class LoginintrebarePageModule {}
