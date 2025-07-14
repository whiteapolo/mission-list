import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MISSIONS_LOCAL_STORAGE_KEY } from '../constants';
import { Mission } from '../types';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { MissionsState } from './reducer';
import { selectMissions } from './selectors';
import * as Action from './actions';

@Injectable()
export class MissionsEffects {
  constructor(private actions$: Actions, private store: Store<MissionsState>) {}

  saveMissionsToLocalStorage$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(Action.addMission, Action.updateMission, Action.deleteMission),
        withLatestFrom(this.store.select(selectMissions)),
        tap((missions) => {
          localStorage.setItem(
            MISSIONS_LOCAL_STORAGE_KEY,
            JSON.stringify(missions)
          );
        })
      );
    },
    { dispatch: false }
  );

  loadMissionsFromLocalStorage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(Action.loadMissions),
      switchMap(() => this.loadMissionsFromLocalStorage()),
      map((missions) => Action.setMissions({ missions }))
    );
  });

  private loadMissionsFromLocalStorage(): Observable<Mission[]> {
    const data = localStorage.getItem(MISSIONS_LOCAL_STORAGE_KEY);

    if (!data) {
      return throwError(() => {
        return new Error("couldn't load missions from local storage");
      });
    }

    return of(JSON.parse(data));
  }

  // saveMissions$ = this.saveMissionsToLocalStorage$;
  // loadMissions$ = this.loadMissionsFromLocalStorage$;
}
