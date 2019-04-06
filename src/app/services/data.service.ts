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
    const savings: any = await this.getPromise(url);
    switch (type) {
      case 'amazon' :
        switch (column) {
          case 'activity':
            const  dates = savings[0];
            return this.countQuantity(dates);
            break;
        }
        break;
      case 'google' :
        switch (column) {
          case 'x':
            break;
        }
        break;
      case 'facebook' :
        break;
      case 'instagram':
        switch (column) {
          case 'media likes' :
            const instagramLikes = [];
            const instagramData = savings.media_likes;
            for (const line of instagramData) {
              instagramLikes.push([
                line[0],
                line[1]
              ]);
            }
            return instagramLikes;
            break;
        }
        break;
    }
  }

  getDateFromTimeStamp(timestamp) {
    const date = new Date(timestamp);
    let day = date.getDate().toString();
    if (date.getDate() < 10) {
      day = '0' + day;
    }
    let month = date.getMonth().toString();
    if (date.getMonth() < 10) {
      month =  '0' + month;
    }
    const year = date.getFullYear().toString();
    const dateStr = day + month + year;
    return dateStr;
  }

  async countQuantity(data) {
    return data.reduce((b, c) => ((b[b.findIndex(d => d.el === c)] || b[b.push({el: c, count: 0}) - 1]).count++, b), []);
  }
}
