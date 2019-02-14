import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { StudioSchedules, Schedule } from '../../config/models'

@Component({
  selector: 'app-add-edit-schedule',
  templateUrl: './add-edit-schedule.component.html',
  styleUrls: ['./add-edit-schedule.component.css']
})
export class AddEditScheduleComponent implements OnInit {
  @Output() onCancelCreate = new EventEmitter()
  @Output() onScheduleSave = new EventEmitter<StudioSchedules>()
  @Input() studioSchedules: StudioSchedules
  @Input() status: string = undefined

  constructor(private fb: FormBuilder) { }

  addEditForm: FormGroup
  newSchedule: Schedule = {
    studioScheduleSlotId: "",
    startTime: "",
    endTime: "",
    faculty: "",
    assignerName: ""
  }

  ngOnInit() {
    this.addEditForm = this.fb.group({
      studioName: ['', [Validators.required]],
      date: ['', [Validators.required, Validators.pattern(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)]],
      studioScheduleSlotList: this.fb.array([
        this.initStudioSchedule()
      ])
    });
    this.addEditForm.patchValue({
      'studioName': this.studioSchedules.studioName,
      'date': this.studioSchedules.date
    })
    if (this.studioSchedules && this.studioSchedules.studioScheduleSlotList && this.studioSchedules.studioScheduleSlotList.length > 0) {
      const control = <FormArray>this.addEditForm.controls['studioScheduleSlotList'];
      if (control.length) {
        control.removeAt(0)
        this.studioSchedules.studioScheduleSlotList.forEach(() => control.push(this.initStudioSchedule()))
      }
      this.addEditForm.patchValue({
        'studioScheduleSlotList': this.studioSchedules && this.studioSchedules.studioScheduleSlotList.length ? this.studioSchedules.studioScheduleSlotList : [this.newSchedule]
      })

    }
  }

  initStudioSchedule() {
    return this.fb.group({
      startTime: ['', [Validators.required, Validators.pattern(/^([0-1]\d|2[0-3])(?::([0-5]\d))?(?::([0-5]\d))?$/)]],
      endTime: ['', [Validators.required, Validators.pattern(/^([0-1]\d|2[0-3])(?::([0-5]\d))?(?::([0-5]\d))?$/)]],
      faculty: ['', [Validators.required]],
      assignerName: ['', [Validators.required]]
    });
  }

  updateAddEditForm(data) {
    this.addEditForm.setValue({ 'studioName': data.studioName })
    this.addEditForm.setValue({ 'date': data.date })
  }

  addSlot() {
    // add address to the list
    const control = <FormArray>this.addEditForm.controls['studioScheduleSlotList'];
    control.push(this.initStudioSchedule());
  }

  removeSlot(i: number) {
    // remove address from the list
    const control = <FormArray>this.addEditForm.controls['studioScheduleSlotList'];
    control.removeAt(i);
  }

  onCancel() {
    this.onCancelCreate.emit()
  }

  onSave() {
    this.onScheduleSave.emit(this.addEditForm.value)
  }

}
