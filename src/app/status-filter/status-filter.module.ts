import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusFilterComponent } from './status-filter.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { OptionSelectModule } from '../option-select/option-select.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [StatusFilterComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatOptionModule,
    OptionSelectModule,
    ReactiveFormsModule,
  ],
  exports: [StatusFilterComponent],
})
export class StatusFilterModule {}
