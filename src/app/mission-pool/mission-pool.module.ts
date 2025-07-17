import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionPoolComponent } from './mission-pool.component';
import { MissionCardModule } from '../mission-card/mission-card.module';

@NgModule({
  declarations: [MissionPoolComponent],
  imports: [CommonModule, MissionCardModule],
  exports: [MissionPoolComponent],
})
export class MissionPoolModule {}
