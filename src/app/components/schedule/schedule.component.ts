import { Component, OnInit, Input } from '@angular/core';

// model
import { Schedule } from '../../config/models'

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  @Input() schedule: Schedule
  constructor() { }

  ngOnInit() {
    console.log("sc", this.schedule)
  }

}
