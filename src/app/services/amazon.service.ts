import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AmazonService {

  constructor(public http: HttpClient) {
    console.log('Amazon Service loaded');
  }
  public giveMeSomeText() {
    return new Promise((resolve, reject) => {
      let fullData = '';
      this.http.get('assets/testdata.csv', {responseType: 'text'})
          .subscribe(
              data => {
                console.log(data);
                fullData += data;
              },
              error => {
                reject(error);
              },
              () => {
                resolve(fullData);
              }
          );
    });
  }
}
