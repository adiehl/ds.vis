import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {

  constructor(public dataservice: DataService, public db: DatabaseService) {
    console.log('Alright.');
  }

  returnMediaLikes() {
    // return this.dataservice.getFile('instagram', 'media likes', 'assets/likes.json');
  }

  returnUsername() {

    return Promise.resolve(this.dataservice.getDataFromFile('instagram', 'profile', 'assets/profile.json'));

  }

  async returnMessages() {

    return Promise.resolve(this.dataservice.getDataFromFile('instagram', 'messages', 'assets/messages.json'));
  }

  async getLikesPerDay() {
    const likes = await this.getMediaLikesFromFile();
    const likes2 = [];
    let i;
    for (i = 0; i < likes.length; i++) {
      likes2.push(likes[i][0].slice(0, 10));
    }

    const likes3 =  await this.dataservice.countQuantity(likes2);
    console.log(likes3);
    return likes3;


    return likes;
  }

  async getMessagesPerDay() {
    const likes = await this.getMessagesCountFromFile();
    const likes2 = [];
    let i;
    for (i = 0; i < likes.length; i++) {
      likes2.push(likes[i][1].slice(0, 10));
    }

    const likes3 =  await this.dataservice.countQuantity(likes2);
    console.log(likes3);
    return likes3;


    return likes;
  }

  protected async getMediaLikesFromFile() {
    const savings = await this.db.getFile('instagram_likes');
    const instagramLikes = [];
    const savingsObject = JSON.parse(savings.toString());
    const instagramData = savingsObject.media_likes;
    for (const line of instagramData) {
      instagramLikes.push([
        line[0],
        line[1]
      ]);
    }
    return instagramLikes;
  }

  protected async getMessagesCountFromFile() {
    const savings = await this.db.getFile('instagram_messages');
    const instagramMessages = [];
    const instagramMessagesData = JSON.parse(savings.toString());
    console.log(instagramMessagesData);
    for (const i  of instagramMessagesData) {
      for (const j of i.conversation) {
        instagramMessages.push([
          j.sender,
          j.created_at
        ]);

      }
    }
    return instagramMessages;
  }
}


