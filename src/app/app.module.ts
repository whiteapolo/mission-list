import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MissionModalModule } from './mission-modal/mission-modal.module';
import { MissionCardModule } from './mission-card/mission-card.module';
import { MissionsEffects } from './missions-store/missions-effects';
import { StoreModule } from '@ngrx/store';
import { missionsReducer } from './missions-store/missions-reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StatusFilterModule } from './status-filter/status-filter.module';
import { SearchBarModule } from './search-bar/search-bar.module';
import { MissionPoolModule } from './mission-pool/mission-pool.module';
import { CreateMissionModule } from './create-mission/create-mission.module';
import { IconsModule } from './icons/icons.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    StatusFilterModule,
    SearchBarModule,
    MissionPoolModule,
    CreateMissionModule,
    BrowserAnimationsModule,
    FormsModule,
    IconsModule,
    StoreModule.forRoot({ app: missionsReducer }),
    EffectsModule.forRoot([MissionsEffects]),
    StoreDevtoolsModule.instrument({}),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
