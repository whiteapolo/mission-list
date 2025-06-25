import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MissionCardComponent } from './mission-card/mission-card.component';

@NgModule({
  declarations: [
    AppComponent,
    MissionCardComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
