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
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EMPTY_MISSION } from 'src/app/constants';

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
  missionStatusTypes = Object.values(MissionStatus);
  flatMissionsArray: Mission[] = [];
  filteredMissions: Observable<Mission[]> | undefined;
  mission: Mission = EMPTY_MISSION;
  isSubmitted = false;

  missionForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    status: [MissionStatus.ACTIVE],
    parent: ['', this.missionParentValidator],
  });

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

    if (parent) {
      this.filteredMissions = parent.valueChanges.pipe(
        startWith(''),
        map((title) => this.filterMissionsByTitle(title))
      );
    }
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

  private filterMissionsByTitle(title: string): Mission[] {
    return this.flatMissionsArray.filter((mission) =>
      mission.title.includes(title)
    );
  }
}
