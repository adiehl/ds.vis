import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';


@Injectable({
  providedIn: 'root'
})
export class InstagramService {

  constructor(public http: HttpClient, public dataservice: DataService) {
    console.log('Instagram Service loaded');
  }
  public async giveMeSomeData() {
    const data: any = await this.dataservice.getCSV('instagram');
    const jsondata: any = await this.dataservice.getData('test');
    const instagramLikes = [];
    const instagramData = jsondata.media_likes;
    for (const line of instagramData) {
      instagramLikes.push([
        line[0],
        line[1]
      ]);
    }
    console.log(jsondata);

    // return data;
    return instagramLikes;
  }


  public async likesPerDay(){
    const instagramLikes = this.giveMeSomeData();
    return none;
  }

  public async extractDate(date) {
    return date.slice(0, 10);
  }
}
