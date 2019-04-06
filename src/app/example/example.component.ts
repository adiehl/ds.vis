import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {

  public dateData = [];
  public numberData = [];
  public showChart = false;
  public label = 'Example Data';

  constructor(public db: DatabaseService, public csv: Papa) {
    this.loadDataAndShowChart();
  }

  public async loadDataAndShowChart() {
    const data = await this.db.getFile('example_data');
    this.csv.parse(data.toString(), {
      complete: (result) => {
        console.log('Parsed: ', result);
        let i = 0;
        const dates = [];
        const numbers = [];
        for (const line of result.data) {
          // skip headers or so
          if (i++ === 0) {
            continue;
          }
          if (line[0] && line[1]) {
            this.dateData.push(line[0].toString());
            this.numberData.push(Number(line[1]));
          }
        }
        this.showChart = true;
        // ready to show the component
      }
    });
  }
  ngOnInit() {
  }

}
