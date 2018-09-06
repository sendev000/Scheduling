import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared';

import { LessonComponent } from './lesson.component';

@NgModule({
  imports: [
  	SharedModule
  ],
  declarations: [LessonComponent]
})
export class LessonModule {}