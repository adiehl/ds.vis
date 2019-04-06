import { Injectable } from '@angular/core';
import {AmazonService} from "./amazon.service";
import {GoogleService} from "./google.service";
import {HttpClient} from "@angular/common/http";
import {DataService} from "./data.service";

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
}
