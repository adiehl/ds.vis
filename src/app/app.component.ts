import { Component } from '@angular/core';
import { AmazonService } from './services/amazon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public output = '';
  public fileToUpload;
  constructor(public amazon: AmazonService) {
    console.log('do something');
    this.doSomething();
  }
  public async doSomething() {
    this.output = await this.amazon.giveMeSomeText();
  }
  public handleFileInput(files) {

  }
}
