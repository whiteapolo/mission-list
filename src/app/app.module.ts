import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MissionModalModule } from './mission-modal/mission-modal.module';
import { MissionCardModule } from './mission-card/mission-card.module';
import { MissionsEffects } from './missions-store/effects';
import { StoreModule } from '@ngrx/store';
import { missionsReducer } from './missions-store/reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { IconService } from './icon.service';
import { StatusFilterModule } from './status-filter/status-filter.module';
import { SearchBarModule } from './search-bar/search-bar.module';
import { MissionPoolModule } from './mission-pool/mission-pool.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    MissionModalModule,
    StatusFilterModule,
    SearchBarModule,
    MissionPoolModule,
    BrowserAnimationsModule,
    FormsModule,
    StoreModule.forRoot({ app: missionsReducer }),
    EffectsModule.forRoot([MissionsEffects]),
    StoreDevtoolsModule.instrument({}),
  ],
  bootstrap: [AppComponent],
  providers: [IconService],
})
export class AppModule {}
