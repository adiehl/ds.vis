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
  constructor(public amazon: AmazonService, public dataservice: DataService ) {
    this.initHoursGraph();
    this.initActivityGraph();
  }

  public async initHoursGraph() {
    const labels = await this.amazon.getHours();
    const sum = 0;
    for(const i of labels){
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

  public async initActivityGraph(){
    const label = await this.amazon.getActivityData();
    const helpLabels = [];
    let helpLabels2 = [];
    for(const line of label){
      this.numbers.push(line.count);
      helpLabels.push(line.el);
    }
    helpLabels2 = this.sortDates(helpLabels);
    for(const l of helpLabels2){
      this.labels.push(l);
    }
    this.showChart = true;
  }
  public sort(array){
    var temp;

    for(var i=0; i<array.length; i++){
      var mi = i;

      for(var j = i + 1; j<array.length; j++) {
        if(Number(array[j]) < Number(array[mi])) {
          mi = j;
        }
      }

      temp = Number(array[i]);
      array[i] = Number(array[mi]);
      array[mi] = temp;
    }
  }

  public sortDates(list){
    const timestamps = [];
    const dates = []
    for(const i of list){
      timestamps.push(Date.parse(i));
    }
    this.sort(timestamps);
    for (const j of timestamps){
      dates.push(this.dataservice.getDateFromTimeStamp(j));
    }
    return dates;
  }

  ngOnInit() {

  }

}
