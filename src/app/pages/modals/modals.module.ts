import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PerfilComponent } from './perfil/perfil.component';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [PerfilComponent],
  exports: [
    PerfilComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ModalsModule { }
