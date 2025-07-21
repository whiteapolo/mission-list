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
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [MissionCardComponent],
  imports: [
    MissionModalModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatIconModule,
  ],
  exports: [MissionCardComponent],
})
export class MissionCardModule {}
