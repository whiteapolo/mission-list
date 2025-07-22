import { Component, OnInit } from '@angular/core';
import { Mission, MissionStatusFilter } from './types';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectMissions } from './missions-store/missions-selectors';
import { MissionsState } from './missions-store/missions-reducer';
import { loadMissions } from './missions-store/missions-actions';
import { IconService } from './icon.service';
import { MissionModalComponent } from './mission-modal/mission-modal.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  MissionStatusFilterEnum = MissionStatusFilter;
  missions$: Observable<Mission[]> = EMPTY;
  searchQueryControl = new FormControl('');
  statusFilterControl = new FormControl(MissionStatusFilter.NO_FILTER);

  constructor(
    private store: Store<MissionsState>,
    public dialog: MatDialog,
    private iconService: IconService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadMissions());
    this.missions$ = this.store.select(selectMissions);
  }

  createMission() {
    this.dialog.open(MissionModalComponent, {
      hasBackdrop: true,
    });
  }
}
