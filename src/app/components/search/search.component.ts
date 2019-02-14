import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// import services
import { DataService } from '../../services/data.service'

// interfaces

import { StudioSchedules } from '../../config/models'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private dataService: DataService) { }
  showAddEditModal = false;
  status: string = undefined

  searchForm = new FormGroup({
    studioName: new FormControl('', [Validators.required]),
    localDate: new FormControl('', [Validators.required, Validators.pattern(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)]),
  });

  studioSchedules: StudioSchedules
  fetchedSchedule: StudioSchedules
  newStudioSchedule: StudioSchedules = {
    studioScheduleId: "",
    date: "",
    studioName: "",
    studioScheduleSlotList: []
  }

  ngOnInit() {
  }

  onAttemptCreate() {
    this.studioSchedules.studioName = this.searchForm.value.studioName;
    this.studioSchedules.date = this.searchForm.value.localDate;
    this.showAddEditModal = true;
  }

  OnExplicitCreate() {
    this.studioSchedules = this.newStudioSchedule
    this.studioSchedules.studioScheduleId = undefined;
    this.onAttemptCreate()
  }

  updateForm(studioSchedules: StudioSchedules) {
    this.studioSchedules = this.fetchedSchedule;
    this.showAddEditModal = true;
  }

  OnCreateConfirm(studioSchedules: StudioSchedules) {
    if (this.studioSchedules.studioScheduleId) {
      studioSchedules['studioScheduleId'] = this.studioSchedules.studioScheduleId
      this.dataService.updateSchedule(studioSchedules).subscribe(resp => {
        this.status = resp.responseMsg;
        this.fetchedSchedule = { ...this.fetchedSchedule, ...studioSchedules }
        setTimeout(() => this.showAddEditModal = false, 1000)
      })
    } else {
      this.dataService.createSchedule(studioSchedules).subscribe(resp => {
        this.status = resp.responseMsg;
        this.fetchedSchedule = { ...this.fetchedSchedule, ...studioSchedules }
        setTimeout(() => this.showAddEditModal = false, 1000)
      })
    }

  }

  onCancelCreate() {
    this.showAddEditModal = false;
  }

  onSubmit() {
    this.dataService.getSchedules(this.searchForm.value)
      .subscribe(resp => {
        this.studioSchedules = resp || this.newStudioSchedule
        this.fetchedSchedule = resp || this.newStudioSchedule
      }, error => this.studioSchedules = this.newStudioSchedule);
  }

}
