import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AmazonService {

  constructor(public http: HttpClient, public dataservice: DataService) {
    console.log('Amazon Service loaded');
  }

  async getActivityData() {
    const returnValue = this.dataservice.getDataFromFile('amazon', 'activity', 'assets/Arbeitsdatei Amazon.csv');
    return returnValue;
  }

  async getOperatingSystem(){
    const returnValue = this.dataservice.getDataFromFile('amazon', 'operating system' , 'assets/Arbeitsdatei Amazon.csv');
    return returnValue;
  }
}
