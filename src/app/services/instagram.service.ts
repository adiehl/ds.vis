import { Injectable } from '@angular/core';
import {AmazonService} from './amazon.service';
import {GoogleService} from './google.service';
import {HttpClient} from '@angular/common/http';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {

  constructor(public http: HttpClient, public dataservice: DataService) {
    console.log('Alright.');
  }

  returnMediaLikes() {
    return this.dataservice.getDataFromFile('instagram', 'media likes', 'assets/likes.json');
  }

  returnUsername() {

    return Promise.resolve(this.dataservice.getDataFromFile('instagram', 'profile', 'assets/profile.json'));

  }

  returnMessages() {

    return Promise.resolve(this.dataservice.getDataFromFile('instagram', 'messages', 'assets/messages.json'));
  }




  async getLikesPerDay() {
    const likes = await this.dataservice.getDataFromFile('instagram', 'media likes', 'assets/likes.json');

    const likes2 = [];
    let i;
    for (i = 0; i < likes.length; i++) {
      likes2.push(likes[i][0].slice(0, 10));
    }

    const likes3 =  await this.dataservice.countQuantity(likes2);
    console.log(likes3);
    return likes3;

    /*
    const dailyLikes = {};

    for (const i of likes ) {
      const day = this.getDate(likes[i][0]).toString();
      if (!dailyLikes[day]) {
        dailyLikes[day] = 1;
      } else {
        dailyLikes[day]++;
      }
    }

    */

    return likes;
  }
}


