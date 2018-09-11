import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared';

import { SchoolComponent } from './school.component';

@NgModule({
  imports: [
  	SharedModule
  ],
  declarations: [SchoolComponent]
})
export class SchoolModule {}