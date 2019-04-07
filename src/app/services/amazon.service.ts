import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class AmazonService {

  constructor(public http: HttpClient, public dataservice: DataService, public db: DatabaseService) {
    console.log('Amazon Service loaded');
  }

  async getActivityData() {
    const savings = await this.db.getFile('amazon_searches');

    let dates = [];
    const separated = savings.split("\n");
    if (separated) {
      for (let line of separated) {
        const regex = /^"(\d+\/\d+\/\d+)/gm;
        const data = regex.exec(line);
        if (data !== null && data[1]) {
          dates.push(data[1]);
        }
      }
    }
    return this.countQuantity(dates);
  }

  countQuantity(data) {
    return data.reduce((b, c) => ((b[b.findIndex(d => d.el === c)] || b[b.push({el: c, count: 0}) - 1]).count++, b), []);
  }


  async getOperatingSystem(){
    const savings = await this.db.getFile('amazon_searches');
    let os = [];
    const lines = savings.split("\n");
    if (lines) {
      for (let line of lines) {
        const regex = /(Windows|Android)/gm;
        const data = regex.exec(line);
        if (data !== null) {
          os.push(data[0]);
        }
      }
    }
    return this.countQuantity(os);

  }
  async getDurations() {
    const savings = await this.db.getFile('amazon_searches');
    const lines2 = savings.split("\n");
    const durations = [];
    const durationsW = [];
    let sumHours = 0;
    let sumMinutes = 0;
    if (lines) {
      for (let line of lines2) {
        const regex = /(\d+\:\d+\.0)/;
        const data = regex.exec(line);
        if (data !== null) {
          durations.push(data[0]);
        }
      }
      for (const i in durations) {
        durationsW.push(durations[i].split(":"));
      }
      for (const j in durationsW) {
        sumHours += Number(durationsW[j][0]) / durationsW.length;
        sumMinutes += Number(durationsW[j][1]) / durationsW.length;
      }
      const sum = Math.round(sumHours * 60 + sumMinutes);
      const minutes = sum % 60;
      const hours = (sum - minutes) / 60;
      const result = [hours, minutes]
      console.log(result);
      return result;
    }
  }
  async getHours() {
    const savings = await this.db.getFile('amazon_searches');
    const times = savings.split("\n");
    const timeList = [];
    let hoursT = [];
    if (times) {
      for (const time of times) {
        const regex = /(\d+\:\d+)/;
        const data = regex.exec(time);
        if (data !== null) {
          timeList.push(data[0]);
        }
      }
      for (const i in timeList) {
        hoursT.push(timeList[i].split(":")[0]);
      }
      return this.countQuantity(hoursT);
    }
  }
}
