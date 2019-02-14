export interface ScheduleQuery {
    studioName: string,
    localDate: string
}

export interface StudioSchedules {
    studioScheduleId: string,
    date: string,
    studioName: string,
    studioScheduleSlotList: Array<Schedule>
}

export interface Schedule {
    studioScheduleSlotId: string,
    startTime: string,
    endTime: string,
    faculty: string,
    assignerName: string
}