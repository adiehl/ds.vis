import { Component } from '@angular/core';
import { AmazonService } from './services/amazon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public output = [];
  public currentPage = 'amazon';
  public fileToUpload;
  constructor(public amazon: AmazonService) {
    console.log('do something');
    this.doSomething();
  }
  public async doSomething() {
    const csvData: any = await this.amazon.giveMeSomeData();
    console.log(csvData);
    this.output = csvData;

  }
  public handleFileInput(files) {

  }
  public showPage(pageName) {
    this.currentPage = pageName;
  }
}
