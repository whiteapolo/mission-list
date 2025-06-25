import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Mission } from './mission';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  
  getMissions = (): Observable<Mission[]> => {
    return this.http.get<Mission[]>("/assets/missions.json");
  }

  constructor(private http: HttpClient) { }
}