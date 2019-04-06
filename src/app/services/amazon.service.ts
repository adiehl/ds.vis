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
  public async giveMeSomeData() {
      const data: any = await this.dataservice.getCSV('amazon');
      const jsondata: any = await this.dataservice.getData('test');
      const zeugs = [];
      const facebookData = jsondata.searches;
      for (const line of facebookData) {
          zeugs.push([
              line.timestamp,
              line.data[0].text
              ]);
      }
      console.log(jsondata);
      // return data;
      return zeugs;
  }
}
