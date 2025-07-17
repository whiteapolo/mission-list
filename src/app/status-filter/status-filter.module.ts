import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusFilterComponent } from './status-filter.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [StatusFilterComponent],
  imports: [CommonModule, MatSelectModule, MatOptionModule],
  exports: [StatusFilterComponent],
})
export class StatusFilterModule {}
