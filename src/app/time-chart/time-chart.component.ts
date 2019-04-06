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
  public barChartLabels = ['01.01.19', '02.01.19', '03.01.19'];
  public barChartType = 'line';
  public barChartLegend = true;
  public barChartData = [
  ];

  constructor() {
    console.log('Waiting for Chart Initialization');
  }

  ngOnInit() {
    this.barChartData.push(
        {data: this.numberData, label: this.label}
        // {data: [10, 50, 20], label: this.label}
    );
    this.barChartLabels = [];
    for (const x in this.dateData) {
      this.barChartLabels.push(x.toString());
    }
    // this.barChartLabels = this.dateData;
    this.showChart = true;
    console.log(JSON.stringify(this.dateData));
    console.log(JSON.stringify(this.numberData));

  }

}
