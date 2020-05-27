import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiperfilPageRoutingModule } from './miperfil-routing.module';

import { MiperfilPage } from './miperfil.page';
import { PipesModule } from '../../pipes/pipes.module';
import { DetallebatallaComponent } from '../modals/detallebatalla/detallebatalla.component';
import { ModalsModule } from '../modals/modals.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiperfilPageRoutingModule,
    PipesModule,
    ModalsModule
  ],
  declarations: [MiperfilPage],
  entryComponents: [DetallebatallaComponent]
})
export class MiperfilPageModule {}
