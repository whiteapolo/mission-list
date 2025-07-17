import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MissionModalComponent } from './mission-modal.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { OptionSelectModule } from '../option-select/option-select.module';

@NgModule({
  declarations: [MissionModalComponent],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatDialogModule,
    OptionSelectModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
  ],
  exports: [MissionModalComponent],
})
export class MissionModalModule {}
