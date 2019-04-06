import { Component } from '@angular/core';
import { AmazonService } from './services/amazon.service';
import {GoogleService} from './services/google.service';
import {InstagramService} from './services/instagram.service';
import {DataService} from './services/data.service';
import {stringify} from 'querystring';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public output = [];
  public currentPage = 'amazon';
  public fileToUpload;
  constructor(public amazon: AmazonService, public google: GoogleService, public instagram: InstagramService) {
    console.log('do something');
    this.doSomething();
  }


  public async doSomething() {

    const jsonData: any = await this.instagram.returnMediaLikes();
    this.output = jsonData;

    const a = await this.instagram.returnUsername();
    console.log(a);

    this.instagram.getLikesPerDay();
    console.log(await this.instagram.returnMessages());


  }

  public handleFileInput(files) {

  }
  public showPage(pageName) {
    this.currentPage = pageName;
  }
}
