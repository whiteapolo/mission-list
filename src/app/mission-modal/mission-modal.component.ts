import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Mission, MissionStatus } from '../types';
import { MissionService } from '../mission.service';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  MISSION_STATUS_FILTERS,
  MISSION_STATUS_TYPES,
} from 'src/app/constants';

interface MissionModalData {
  mission: Mission;
  name: string;
}

@Component({
  selector: 'app-mission-modal',
  templateUrl: './mission-modal.component.html',
  styleUrls: ['./mission-modal.component.less'],
})
export class MissionModalComponent implements OnInit {
  missionStatusTypes = MISSION_STATUS_TYPES;
  missions: Mission[] = [];
  mission!: Mission;
  isSubmitted = false;

  missionForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    status: [MissionStatus.ACTIVE],
    parent: ['', this.missionParentValidator],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MissionModalData,
    public dialogRef: MatDialogRef<MissionModalComponent>,
    public missionService: MissionService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.missionService.getMissions().subscribe((missions) => {
      this.missions = missions;
    });

    this.mission = {
      ...this.data.mission,
    };

    this.missionForm.get('name')?.setValue(this.mission.name);
    this.missionForm.get('status')?.setValue(this.mission.status);
    if (this.mission.parentUuid) {
      this.missionForm
        .get('parent')
        ?.setValue(
          this.missions.find(
            (mission) => mission.uuid === this.mission.parentUuid
          )
        );
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    this.isSubmitted = true;
    if (this.missionForm.invalid) {
      return;
    }

    this.dialogRef.close({
      ...this.missionForm.value,
      parentUuid: this.missionForm.value.parent.uuid || undefined,
    });
  }

  displayMissionname(mission: Mission) {
    return mission.name;
  }

  isFieldValid(field: string) {
    return this.missionForm.get(field)?.valid || !this.isSubmitted;
  }

  missionParentValidator(control: AbstractControl): ValidationErrors | null {
    if (typeof control.value === 'string' && control.value.length > 0) {
      return { notAMission: { value: control.value } };
    }
    return null;
  }

  public shouldShowMissionInParentSelect(mission: Mission): boolean {
    return (
      mission.name.includes(this.missionForm.get('parent')?.value) &&
      mission.uuid !== this.mission.uuid
    );
  }
}
