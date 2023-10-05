import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { initialtestcomponent } from './initialtest.component';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { initialtestPageRoutingModule } from './initialtest-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: initialtestcomponent }]),
    initialtestPageRoutingModule,
  ],
  declarations: [initialtestcomponent]
})
export class initialtestPageModule {}
