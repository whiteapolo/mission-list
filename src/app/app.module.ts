import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MissionCardComponent } from './mission-card/mission-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MissionModalComponent } from './mission-modal/mission-modal.component';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ClickWrapperComponent } from './click-wrapper/click-wrapper.component';
import { MissionModalModule } from './mission-modal/mission-modal.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MissionCardModule } from './mission-card/mission-card.module';
import { ClickWrapperModule } from './click-wrapper/click-wrapper.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    MissionCardModule,
    MissionModalModule,
    ClickWrapperModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
