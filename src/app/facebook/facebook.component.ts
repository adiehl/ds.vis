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
    const stats = await this.getStats();
    const dates = [];
    const numbers = [];
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
    for (const entry of structuredData.account_activity) {
      if (!entry.timestamp) {
        continue;
      }
      const myDate = new Date(entry.timestamp * 1000);
      if (activities[this.getDateShort(myDate)]) {
        activities[this.getDateShort(myDate)]++;
      } else {
        activities[this.getDateShort(myDate)] = 1;
      }
    }
    return activities;
  }

  private getDateShort(date: Date) {

    const newDate = date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
        ('00' + date.getUTCDate()).slice(-2);

    console.log(newDate);
    return newDate;
  }
  ngOnInit() {
  }

}
