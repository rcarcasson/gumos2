import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CofresPipe } from './cofres.pipe';
import { GoldencardPipe } from './goldencard.pipe';
import { ModlevelPipe } from './modlevel.pipe';
import { WinlosePipe } from './winlose.pipe';
import { ImgbatallaPipe } from './imgbatalla.pipe';
import { NombatallaPipe } from './nombatalla.pipe';



@NgModule({
  declarations: [CofresPipe, GoldencardPipe, ModlevelPipe, WinlosePipe, ImgbatallaPipe, NombatallaPipe],
  exports: [
    CofresPipe,
    GoldencardPipe,
    ModlevelPipe,
    WinlosePipe,
    ImgbatallaPipe,
    NombatallaPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
