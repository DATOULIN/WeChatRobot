const schedule = require('node-schedule');

export function setSchedule(date: string, callback:any) {
  schedule.scheduleJob(date, callback)
}

