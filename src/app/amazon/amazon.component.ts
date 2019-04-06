import { Component, OnInit } from '@angular/core';
import { AmazonService } from "../services/amazon.service";

@Component({
  selector: 'app-amazon',
  templateUrl: './amazon.component.html',
  styleUrls: ['./amazon.component.scss']
})
export class AmazonComponent implements OnInit {
  public output = '';
  constructor(public amazon: AmazonService) {
    this.doSomething();
  }
  public async doSomething() {
    this.output = await this.amazon.getOperatingSystem();
  }

  ngOnInit() {

  }

}
