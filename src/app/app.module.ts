import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MissionModalModule } from './mission-modal/mission-modal.module';
import { MissionCardModule } from './mission-card/mission-card.module';
import { MissionsEffects } from './missions-store/effects';
import { StoreModule } from '@ngrx/store';
import { missionsReducer } from './missions-store/reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { StatusFilterComponent } from './status-filter/status-filter.component';
import { IconService } from './icon.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, SearchBarComponent, StatusFilterComponent],
  imports: [
    MissionCardModule,
    MissionModalModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    EffectsModule,
    StoreDevtoolsModule,
    HttpClientModule,
    StoreModule.forRoot({ app: missionsReducer }),
    StoreDevtoolsModule.instrument({}),
    EffectsModule.forRoot([MissionsEffects]),
  ],
  bootstrap: [AppComponent],
  providers: [IconService],
})
export class AppModule {}
