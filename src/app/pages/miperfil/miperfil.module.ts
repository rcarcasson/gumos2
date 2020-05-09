import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiperfilPageRoutingModule } from './miperfil-routing.module';

import { MiperfilPage } from './miperfil.page';
import { ModlevelPipe } from '../../pipes/modlevel.pipe';
import { GoldencardPipe } from 'src/app/pipes/goldencard.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiperfilPageRoutingModule
  ],
  declarations: [MiperfilPage, ModlevelPipe, GoldencardPipe]
})
export class MiperfilPageModule {}
