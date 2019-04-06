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
  public showChart = false;

  constructor(public db: DatabaseService) {
    this.loadDataAndShowChart();
  }

  public async loadDataAndShowChart() {
    const statsObj = await this.getStats();
    const stats = statsObj.activities;
    const currentDate = statsObj.firstDate;
    console.log('DATES:');
    console.log(currentDate);
    console.log(statsObj.lastDate);
    while (currentDate > statsObj.lastDate) {
      const shortDate = this.getDateShort(currentDate);
      let count = 0;
      if (stats[shortDate]) {
        count = stats[shortDate];
      }
      this.numbers.push(count);

      this.labels.push(shortDate);
      currentDate.setDate(currentDate.getDate() - 1);
      console.log(`Date: ${currentDate} Count: ${count}`);
    }
    for (const stat of Object.keys(stats)) {
      this.numbers.push(stats[stat]);
      this.labels.push(stat);
    }
    this.showChart = true;
  }

  public async getStats() {
    const data = await this.db.getFile('facebook_activity');
    const structuredData = JSON.parse(data.toString());
    const activities = {};
    let firstDate;
    let lastDate;
    for (const entry of structuredData.account_activity) {
      if (!entry.timestamp) {
        continue;
      }
      const myDate = new Date(entry.timestamp * 1000);
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
    return {
      activities,
      firstDate,
      lastDate
    };
  }

  private getDateShort(date: Date) {

    const newDate = date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
        ('00' + date.getUTCDate()).slice(-2);

    //console.log(newDate);
    return newDate;
  }
  ngOnInit() {
  }

}
