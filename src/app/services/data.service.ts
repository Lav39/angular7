import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment'

import { ScheduleQuery, StudioSchedules } from '../config/models'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }
  apiUrl = environment.apiurl


  getSchedules(scheduleQuery: ScheduleQuery) {
    let url = this.apiUrl + "schedule/check"
    return this.http.post<StudioSchedules>(url, scheduleQuery, this.httpOptions)
  }

  createSchedule(studioSchedules: StudioSchedules) {
    let url = this.apiUrl + "schedule"
    return this.http.post<any>(url, studioSchedules, this.httpOptions)
  }
  updateSchedule(studioSchedules: StudioSchedules) {
    let url = this.apiUrl + "schedule"
    return this.http.put<any>(url, studioSchedules, this.httpOptions)
  }

}
