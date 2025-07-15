import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionCardComponent } from './mission-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MissionModalModule } from '../mission-modal/mission-modal.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ClickWrapperModule } from '../click-wrapper/click-wrapper.module';

@NgModule({
  declarations: [MissionCardComponent],
  imports: [
    MissionModalModule,
    CommonModule,
    ClickWrapperModule,
    BrowserAnimationsModule,
    FormsModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
  ],
  exports: [MissionCardComponent],
})
export class MissionCardModule {}
