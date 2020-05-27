import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PerfilComponent } from './perfil/perfil.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { DetallebatallaComponent } from './detallebatalla/detallebatalla.component';


@NgModule({
  declarations: [PerfilComponent, DetallebatallaComponent],
  exports: [
    PerfilComponent,
    DetallebatallaComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ModalsModule { }
