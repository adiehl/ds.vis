import { Injectable } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http: HttpClient, public csv: Papa) { }

  getCSV(type) {
    let fullData = '';
    return new Promise((resolve, reject) => {
      this.http.get('assets/testdata.csv', {responseType: 'text'})
          .subscribe(
              data => {
                fullData += data;
              },
              error => {
                reject(error.toString());
              },
              () => {
                  // now parse the csv data
                  this.csv.parse(fullData, {
                      complete: (result) => {
                          resolve(result);
                      }
                  });
              }
          );
    });
  }
}
