import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MissionModalModule } from './mission-modal/mission-modal.module';
import { MissionCardModule } from './mission-card/mission-card.module';
import { ClickWrapperModule } from './click-wrapper/click-wrapper.module';
import { MissionsEffects } from './missions-store/effects';
import { StoreModule } from '@ngrx/store';
import { missionsReducer } from './missions-store/reducer';
import { EffectsModule } from '@ngrx/effects';

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
    EffectsModule,
    StoreModule.forRoot({ app: missionsReducer }),
    EffectsModule.forRoot([MissionsEffects]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
