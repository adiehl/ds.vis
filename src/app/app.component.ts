import { Component } from '@angular/core';
import { AmazonService } from './services/amazon.service';
import {GoogleService} from './services/google.service';
import {InstagramService} from './services/instagram.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public output = [];
  public fileToUpload;
  constructor(public amazon: AmazonService, public google: GoogleService, public instagram: InstagramService) {
    console.log('do something');
    this.doSomething();
  }
  public async doSomething() {
   // const csvData: any = await this.amazon.giveMeSomeData();
    //console.log(csvData);
    //this.output = csvData;
    const jsonData: any = await this.instagram.returnMediaLikes();
    this.output = jsonData;
  }
  public handleFileInput(files) {

  }
}
