import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Mission, MissionStatus } from '../types';
import { MissionService } from '../mission.service';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { EMPTY_MISSION, MISSION_STATUS_TYPES } from 'src/app/constants';

interface MissionModalData {
  mission: Mission;
  title: string;
}

@Component({
  selector: 'app-mission-modal',
  templateUrl: './mission-modal.component.html',
  styleUrls: ['./mission-modal.component.less'],
})
export class MissionModalComponent implements OnInit {
  missionStatusTypes = MISSION_STATUS_TYPES;
  flatMissionsArray: Mission[] = [];
  mission: Mission = EMPTY_MISSION;
  isSubmitted = false;
  searchText = '';

  missionForm = this.formBuilder.group(
    {
      title: ['', [Validators.required, Validators.maxLength(50)]],
      status: [MissionStatus.ACTIVE],
      parent: ['', this.missionParentValidator],
    },
    {
      // updateOn: 'submit',
    }
  );

  constructor(
    public dialogRef: MatDialogRef<MissionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MissionModalData,
    private missionService: MissionService,
    private formBuilder: FormBuilder
  ) {
    this.mission = { ...data.mission };
    missionService.getMissionsAsFlatArray().subscribe((missions) => {
      this.flatMissionsArray = missions.filter(
        (mission) => mission.id !== this.mission.id
      );
    });
  }

  ngOnInit(): void {
    this.missionForm.get('title')?.setValue(this.mission.title);
    this.missionForm
      .get('status')
      ?.setValue(this.mission.status ?? MissionStatus.ACTIVE);
    this.missionForm.get('parent')?.setValue(this.mission.parent ?? '');

    const parent = this.missionForm.get('parent');
  }

  cancel() {
    console.log('Dialog canceled');
    this.dialogRef.close();
  }

  save() {
    this.isSubmitted = true;
    if (this.missionForm.invalid) {
      return;
    }

    this.dialogRef.close({
      ...this.missionForm.value,
    });
  }

  displayMissionTitle(mission: Mission) {
    return mission.title;
  }

  isFieldValid(field: string) {
    return this.missionForm.get(field)?.valid || !this.isSubmitted;
  }

  missionParentValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value || typeof control.value !== 'string') {
      return null;
    }

    return { notAMission: { value: control.value } };
  }

  public getFilteredMissions(): Mission[] {
    return this.flatMissionsArray.filter((mission) =>
      mission.title.includes(this.searchText)
    );
  }
}
