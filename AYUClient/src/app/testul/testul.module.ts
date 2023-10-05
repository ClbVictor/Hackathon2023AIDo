import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestulPageRoutingModule } from './testul-routing.module';

import { TestulPage } from './testul.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestulPageRoutingModule
  ],
  declarations: [TestulPage]
})
export class TestulPageModule {}
