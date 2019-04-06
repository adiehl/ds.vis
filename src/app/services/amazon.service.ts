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
      return data;
  }
}
