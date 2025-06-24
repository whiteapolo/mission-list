import { Component, OnInit } from '@angular/core';
import { Mission } from './mission';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MISSIONS } from './missions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

    missions: Mission[] = [];
    
    constructor(private http: HttpClient) {}

    async ngOnInit() {
      this.missions= MISSIONS;
      console.log(this.missions);
    }
}
