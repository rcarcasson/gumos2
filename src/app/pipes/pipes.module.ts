import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CofresPipe } from './cofres.pipe';
import { GoldencardPipe } from './goldencard.pipe';
import { ModlevelPipe } from './modlevel.pipe';
import { WinlosePipe } from './winlose.pipe';



@NgModule({
  declarations: [CofresPipe, GoldencardPipe, ModlevelPipe, WinlosePipe],
  exports: [
    CofresPipe,
    GoldencardPipe,
    ModlevelPipe,
    WinlosePipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
