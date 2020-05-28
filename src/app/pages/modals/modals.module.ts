import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PerfilComponent } from './perfil/perfil.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { DetallebatallaComponent } from './detallebatalla/detallebatalla.component';
import { ChangelogComponent } from './changelog/changelog.component';


@NgModule({
  declarations: [
    PerfilComponent,
    DetallebatallaComponent,
    ChangelogComponent
  ],
  exports: [
    PerfilComponent,
    DetallebatallaComponent,
    ChangelogComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ModalsModule { }
