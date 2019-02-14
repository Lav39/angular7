import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// model

import { StudioSchedules } from '../../config/models';

@Component({
  selector: 'app-studio',
  templateUrl: './studio.component.html',
  styleUrls: ['./studio.component.css']
})
export class StudioComponent implements OnInit {
  @Input() studioSchedules: StudioSchedules
  @Output() onScheduleSave = new EventEmitter<StudioSchedules>()
  constructor() { }

  showSlots: boolean = false;

  ngOnInit() {

  }
  toggleSlots() {
    this.showSlots = !this.showSlots
  }
  onUpdateSchedule(studioSchedules: StudioSchedules) {
    this.onScheduleSave.emit(studioSchedules)
  }

}
