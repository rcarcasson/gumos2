import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CofresPipe } from './cofres.pipe';
import { GoldencardPipe } from './goldencard.pipe';
import { ModlevelPipe } from './modlevel.pipe';



@NgModule({
  declarations: [CofresPipe, GoldencardPipe, ModlevelPipe],
  exports: [
    CofresPipe,
    GoldencardPipe,
    ModlevelPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
