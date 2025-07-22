import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionModalModule } from '../mission-modal/mission-modal.module';
import { CreateMissionComponent } from './create-mission.component';

@NgModule({
  declarations: [CreateMissionComponent],
  imports: [CommonModule, MissionModalModule],
  exports: [CreateMissionComponent],
})
export class CreateMissionModule {}
