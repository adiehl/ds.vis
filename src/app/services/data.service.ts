import {Injectable} from '@angular/core';
import {Papa} from 'ngx-papaparse';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http: HttpClient, public csv: Papa) {
  }

  getPromise(url: string) {
    let fullData = '';
    return new Promise((resolve, reject) => {
      this.http.get(url, {responseType: 'text'})
        .subscribe(
          data => {
            fullData += data;
          },
          error => {
            reject(error);
          },
          () => {
            // now parse the csv data
            try {
              resolve(JSON.parse(fullData));
            } catch (error) {
              try {
                this.csv.parse(fullData, {
                  complete: (result) => {
                    resolve(result);
                  }
                });
              } catch
                (error) {
              }
            }
          }
        );
    });
  }

  async getDataFromFile(type, column, url) {
    switch (type) {
      case 'amazon' :
        switch (column) {
          case 'x':
            break;
        }
        break;
      case 'google' :
        switch (column) {
          case 'location history' :
            const history: any = await this.getPromise(url);
            const locations = history.locations;
            const times = [];
            const rows = [];
            for (const line of locations) {
              times.push(this.getDateFromTimeStamp(line.timestampMs));
            }
            return times;
            break;
          case 'facebook' :
            break;
          case 'instagram':
            break;
        }
    }
  }

  getDateFromTimeStamp(timestamp) {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = '0' + date.getMinutes();
    const seconds = '0' + date.getSeconds();
    return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  }
}
