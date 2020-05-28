import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RankingPageRoutingModule } from './ranking-routing.module';

import { RankingPage } from './ranking.page';
import { ModalsModule } from '../modals/modals.module';
import { PerfilComponent } from '../modals/perfil/perfil.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RankingPageRoutingModule,
    ModalsModule
  ],
  declarations: [RankingPage],
  entryComponents: [PerfilComponent]
})
export class RankingPageModule {}
