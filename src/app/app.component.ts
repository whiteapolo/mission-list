import { Component, OnInit } from '@angular/core';
import { MissionStatusFilter } from './types';
import { Store } from '@ngrx/store';
import { MissionsState } from './missions-store/missions.reducer';
import { loadMissions } from './missions-store/missions.actions';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  MissionStatusFilterEnum = MissionStatusFilter;
  searchQueryControl = new FormControl('');
  statusFilterControl = new FormControl(MissionStatusFilter.NO_FILTER);

  constructor(private store: Store<MissionsState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadMissions());
  }
}
