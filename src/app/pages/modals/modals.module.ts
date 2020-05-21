import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PerfilComponent } from './perfil/perfil.component';
import { ModlevelPipe } from 'src/app/pipes/modlevel.pipe';
import { GoldencardPipe } from 'src/app/pipes/goldencard.pipe';
import { CofresPipe } from 'src/app/pipes/cofres.pipe';


@NgModule({
  declarations: [PerfilComponent, ModlevelPipe, GoldencardPipe, CofresPipe],
  exports: [
    PerfilComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ModalsModule { }
