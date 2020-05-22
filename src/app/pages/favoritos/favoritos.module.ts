import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritosPageRoutingModule } from './favoritos-routing.module';

import { FavoritosPage } from './favoritos.page';
import { ModalsModule } from '../modals/modals.module';
import { PerfilComponent } from '../modals/perfil/perfil.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritosPageRoutingModule,
    ModalsModule
  ],
  declarations: [FavoritosPage],
  entryComponents: [PerfilComponent]
})
export class FavoritosPageModule {}
