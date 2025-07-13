import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MISSIONS_LOCAL_STORAGE_KEY } from '../constants';
import { Mission } from '../types';
import {
  catchError,
  exhaustMap,
  map,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { missionActions } from './actions';
import { Observable, throwError, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { MissionsState } from './reducer';
import { selectors } from './selectors';

@Injectable()
export class MissionsEffects {
  constructor(private actions$: Actions, private store: Store<MissionsState>) {}

  saveMissionsToLocalStorage$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          missionActions.addMission,
          missionActions.updateMission,
          missionActions.deleteMission
        ),
        withLatestFrom(this.store.select(selectors.missions)),
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
    return (
      this.actions$.pipe(ofType('[Mission] load')),
      exhaustMap(() =>
        this.loadMissionsFromLocalStorage().pipe(
          map((missions) => ({
            type: '[Mission] loaded success',
            missions: missions,
          })),
          catchError(() =>
            of({
              type: '[Mission] loaded success',
              missions: [],
            })
          )
        )
      )
    );
  });

  private loadMissionsFromLocalStorage(): Observable<Mission[]> {
    const data = localStorage.getItem(MISSIONS_LOCAL_STORAGE_KEY);

    if (!data) {
      return throwError(() => {
        return new Error("could't load missions from local storage");
      });
    }

    return of(JSON.parse(data));
  }

  // saveMissions$ = this.saveMissionsToLocalStorage$;
  // loadMissions$ = this.loadMissionsFromLocalStorage$;
}
