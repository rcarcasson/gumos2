import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiclanPageRoutingModule } from './miclan-routing.module';

import { MiclanPage } from './miclan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiclanPageRoutingModule
  ],
  declarations: [MiclanPage]
})
export class MiclanPageModule {}
