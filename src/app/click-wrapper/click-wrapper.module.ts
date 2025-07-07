import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickWrapperComponent } from './click-wrapper.component';

@NgModule({
  declarations: [ClickWrapperComponent],
  imports: [CommonModule],
  exports: [ClickWrapperComponent],
})
export class ClickWrapperModule {}
