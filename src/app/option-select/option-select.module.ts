import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { OptionSelectComponent } from './option-select.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [OptionSelectComponent],
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule],
  exports: [OptionSelectComponent],
})
export class OptionSelectModule {}
