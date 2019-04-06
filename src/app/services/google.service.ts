import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor(public http: HttpClient, public dataservice: DataService) {
    console.log('Google Service loaded');
  }

  async returnTimeStamps() {
    const times: any = await this.dataservice.getDataFromFile('google', 'location history timestamps', 'assets/TestLocationData.json');
    return times;
  }
}

