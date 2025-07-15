import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Mission, MissionStatus } from '../types';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MISSION_STATUS_TYPES } from 'src/app/constants';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MissionsState } from '../missions-store/reducer';
import { selectMissions } from '../missions-store/selectors';

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
  missions$: Observable<Mission[]>;
  mission!: Mission;
  isSubmitted = false;

  missionForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    status: [MissionStatus.ACTIVE],
    parent: ['', this.missionParentValidator],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MissionModalData,
    private store: Store<MissionsState>,
    public dialogRef: MatDialogRef<MissionModalComponent>,
    private formBuilder: FormBuilder
  ) {
    this.missions$ = this.store.select(selectMissions);
  }

  ngOnInit(): void {
    this.mission = {
      ...this.data.mission,
    };

    this.missionForm.get('name')?.setValue(this.mission.name);
    this.missionForm.get('status')?.setValue(this.mission.status);
    this.missions$
      .subscribe((missions) => {
        this.missionForm
          .get('parent')
          ?.setValue(
            missions.find((mission) => mission.id === this.mission.parentId) ||
              ''
          );
      })
      .unsubscribe();
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
      ...this.mission,
      name: this.missionForm.value.name,
      status: this.missionForm.value.status,
      parentId: this.missionForm.value.parent.id || undefined,
    });
  }

  displayMissionname(mission: Mission | undefined) {
    return mission?.name || '';
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
      mission.id !== this.mission.id
    );
  }
}
