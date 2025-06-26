import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MissionCardComponent } from './mission-card/mission-card.component';
import { MissionModalComponent } from './mission-modal/mission-modal.component';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MissionCardComponent,
    MissionModalComponent,
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackDrop: true}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
