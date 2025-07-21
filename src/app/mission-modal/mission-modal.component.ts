import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Mission, MissionStatus } from '../types';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MissionsState } from '../missions-store/reducer';
import {
  selectMissionParent,
  selectMissions,
} from '../missions-store/selectors';
import * as Actions from '../missions-store/actions';
import { EMPTY_MISSION } from '../constants';

interface MissionModalData {
  mission: Mission;
  isEditMission: boolean;
}

@Component({
  selector: 'app-mission-modal',
  templateUrl: './mission-modal.component.html',
  styleUrls: ['./mission-modal.component.less'],
})
export class MissionModalComponent implements OnInit {
  missionStatusTypes = Object.values(MissionStatus);
  missions$: Observable<Mission[]>;
  mission: Mission = EMPTY_MISSION;

  isSubmitted = false;

  missionForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    status: new FormControl(MissionStatus.ACTIVE),
    parent: new FormControl('', this.missionParentValidator),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MissionModalData,
    private store: Store<MissionsState>,
    public dialogRef: MatDialogRef<MissionModalComponent>
  ) {
    this.missions$ = this.store.select(selectMissions);
  }

  ngOnInit(): void {
    this.mission = {
      ...this.data?.mission,
    };

    this.missionForm.get('name')?.setValue(this.mission.name || '');
    this.missionForm
      .get('status')
      ?.setValue(this.mission.status || MissionStatus.ACTIVE);

    this.store
      .select(selectMissionParent(this.mission.id))
      .subscribe((parent) => {
        this.missionForm.get('parent')?.setValue(parent ?? '');
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

    const mission = {
      ...this.mission,
      name: this.missionForm.value.name,
      status: this.missionForm.value.status,
      parentId: this.missionForm.value.parent.id || undefined,
    };

    if (this.data.isEditMission) {
      this.store.dispatch(Actions.updateMission({ newMission: mission }));
    } else {
      this.store.dispatch(Actions.addMission({ mission }));
    }

    this.dialogRef.close();
  }

  displayMissionName(mission: Mission | string | undefined) {
    if (typeof mission === 'string') {
      return mission;
    }
    return mission?.name || '';
  }

  isFieldValid(field: string) {
    return this.missionForm.get(field)?.valid || !this.isSubmitted;
  }

  missionParentValidator(
    parentMissionControl: AbstractControl
  ): ValidationErrors | null {
    if (
      typeof parentMissionControl.value === 'string' &&
      parentMissionControl.value.length > 0
    ) {
      return { notAMission: { value: parentMissionControl.value } };
    }
    return null;
  }

  filterParentSelect(mission: Mission): boolean {
    return (
      mission.name.includes(this.missionForm.get('parent')?.value) &&
      mission.id !== this.mission.id
    );
  }

  abstractControlToformControl(control: AbstractControl): FormControl {
    return control as FormControl;
  }
}
