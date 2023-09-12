import { NgModule } from '@angular/core';
import { QTypeIconPipe } from './qTypeIcon.pipe';
import { CommonModule } from '@angular/common';
import { CheckTruthyPipe } from './check-truthy.pipe';



@NgModule({
  declarations: [
    QTypeIconPipe,
    CheckTruthyPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    QTypeIconPipe,
    CheckTruthyPipe
  ],
  providers: [CheckTruthyPipe, QTypeIconPipe],
})
export class SharedPipesModule { }
