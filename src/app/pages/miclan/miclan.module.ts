import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiclanPageRoutingModule } from './miclan-routing.module';

import { MiclanPage } from './miclan.page';
import { PerfilComponent } from '../modals/perfil/perfil.component';
import { ModalsModule } from '../modals/modals.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiclanPageRoutingModule,
    ModalsModule
  ],
  declarations: [MiclanPage],
  entryComponents: [PerfilComponent]
})
export class MiclanPageModule {}
