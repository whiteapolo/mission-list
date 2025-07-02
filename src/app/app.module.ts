import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MissionCardComponent } from './mission-card/mission-card.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MissionModalComponent } from './mission-modal/mission-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BiggerClickWrapperComponent } from './bigger-click-wrapper/bigger-click-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    MissionCardComponent,
    MissionModalComponent,
    BiggerClickWrapperComponent,
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
