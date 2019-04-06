import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-time-chart',
  templateUrl: './time-chart.component.html',
  styleUrls: ['./time-chart.component.scss']
})
export class TimeChartComponent implements OnInit {
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  @Input() numberData: any;
  @Input() dateData: any = [];
  @Input() label = 'Hello';
  public showChart = false;
  public barChartLabels = [];
  public barChartType = 'line';
  public barChartLegend = true;
  public barChartData = [
  ];

  constructor() {
    console.log('Waiting for Chart Initialization');
  }

  ngOnInit() {
    this.barChartLabels = this.dateData;

    this.barChartData.push(
        {data: this.numberData, label: this.label}
    );

    // this.barChartLabels = this.dateData;
    this.showChart = true;
    console.log(JSON.stringify(this.dateData));
    console.log(JSON.stringify(this.numberData));

  }

}
