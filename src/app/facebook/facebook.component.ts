import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.scss']
})
export class FacebookComponent implements OnInit {

  public numbers = [];
  public labels = [];
  public Daytimenumbers = [];
  public Daytimelabels = [];
  public showChart = false;

  constructor(public db: DatabaseService) {
    this.loadDataAndShowChart();
  }

  public async loadDataAndShowChart() {
    const data = await this.db.getFile('facebook_activity');
    if (data) {
      const statsObj = await this.getStats();
      const stats = statsObj.activities;
      const currentDate = statsObj.firstDate;
      while (currentDate > statsObj.lastDate) {
        const shortDate = this.getDateShort(currentDate);
        let count = 0;
        if (stats[shortDate]) {
          count = stats[shortDate];
        }
        this.numbers.push(count);

        this.labels.push(shortDate);
        currentDate.setDate(currentDate.getDate() - 1);
      }
      for (const stat of Object.keys(stats)) {
        this.numbers.push(stats[stat]);
        this.labels.push(stat);
      }
      // daytimes
      for (let i = 0; i < 24; i++) {
        this.Daytimelabels.push(i);
        this.Daytimenumbers.push(statsObj.hours[i]);
      }
      this.showChart = true;
    }
  }

  public async getStats() {
    const data = await this.db.getFile('facebook_activity');
    const structuredData = JSON.parse(data.toString());
    const activities = {};
    const hours = {};
    for (let i = 0; i < 24; i++) {
      hours[i] = 0;
    }
    let firstDate;
    let lastDate;
    for (const entry of structuredData.account_activity) {
      if (!entry.timestamp) {
        continue;
      }
      const myDate = new Date(entry.timestamp * 1000);
      hours[myDate.getHours()]++;
      if (!firstDate) {
        firstDate = myDate;
      }
      if (activities[this.getDateShort(myDate)]) {
        activities[this.getDateShort(myDate)]++;
      } else {
        activities[this.getDateShort(myDate)] = 1;
      }
      lastDate = myDate;
    }
    console.log(hours);
    return {
      activities,
      firstDate,
      lastDate,
      hours
    };
  }

  private getDateShort(date: Date) {

    const newDate = date.getFullYear() + '-' +
        ('00' + (date.getMonth() + 1)).slice(-2) + '-' +
        ('00' + date.getDate()).slice(-2);

    return newDate;
  }
  ngOnInit() {
  }

}
