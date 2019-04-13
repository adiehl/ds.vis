import { Component, OnInit } from '@angular/core';
import { AmazonService } from "../services/amazon.service";
import { DataService} from "../services/data.service";

@Component({
  selector: 'app-amazon',
  templateUrl: './amazon.component.html',
  styleUrls: ['./amazon.component.scss']
})
export class AmazonComponent implements OnInit {
  public Daytimelabels = [];
  public Daytimenumbers = [];
  public showChart = false;
  public numbers = [];
  public labels = [];
  public amount = [];
  public systems = [];
  public hours = '';
  constructor(public amazon: AmazonService, public dataservice: DataService ) {
    this.initHoursGraph();
    this.setAverageTime();
    this.initActivityGraph();
    this.initOsChart();
  }

  public async initHoursGraph() {
    const labels = await this.amazon.getHours();
    let sum = 0;
    for(const i of labels) {
      sum += Number(i.count);
    }
    console.log(sum);
    for(const line of labels){
      this.Daytimelabels.push(line.el);
      this.Daytimenumbers.push((Number(line.count)/sum) * 100);
      this.sort(this.Daytimelabels);
      this.showChart = true;
    }
  }

  public async initOsChart(){
    const os = await this.amazon.getOperatingSystem();
    for(const line of os){
      this.systems.push(line.el);
      this.amount.push(line.count);
    }
    this.showChart = true;
  }

  public async initActivityGraph(){
    const label = await this.amazon.getActivityData();
    const helpLabels = [];
    let sum = 0;
    let helpLabels2 = [];
    for (const i of label) {
      sum += Number(i.count);
    }
    for(const line of label){
      this.numbers.push((Number(line.count) / sum) * 100);
      helpLabels.push(line.el);
    }
    helpLabels2 = this.sortDates(helpLabels);
    for(const l of helpLabels2){
      this.labels.push(l);
    }
    this.showChart = true;
  }
  public sort(array){
    let temp;

    for (let i = 0; i < array.length; i++){
      let mi = i;

      for (let j = i + 1; j < array.length; j++) {
        if (Number(array[j]) < Number(array[mi])) {
          mi = j;
        }
      }

      temp = Number(array[i]);
      array[i] = Number(array[mi]);
      array[mi] = temp;
    }
  }

  public sortDates(list) {
    const timestamps = [];
    const dates = []
    for (const i of list) {
      timestamps.push(Date.parse(i));
    }
    this.sort(timestamps);
    for (const j of timestamps){
      dates.push(this.dataservice.getDateFromTimeStamp(j));
    }
    return dates;
  }

  public async setAverageTime(){
    const time = await this.amazon.getDurations();
    this.hours += time[0] + ' Minuten ' + time[1] + ' Sekunden';
  }
  ngOnInit() {

  }

}
