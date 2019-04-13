import { Component, OnInit } from '@angular/core';
import { InstagramService } from '../services/instagram.service';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-instagram',
  templateUrl: './instagram.component.html',
  styleUrls: ['./instagram.component.scss']
})
export class InstagramComponent implements OnInit {

  public output = '';
  public numbers = [];
  public labels = [];
  public numbers2 = [];
  public labels2 = [];
  public showChart = false;

  constructor(public instagram: InstagramService, public db: DatabaseService) {
    this.loadChart();
  }

  public async loadChart() {
    const data = this.db.getFile('');
    if (data) {
      const likes = await this.instagram.getLikesPerDay();
      const messages = await this.instagram.getMessagesPerDay();

      for (const like of likes) {
        this.numbers.push(like.count);
        this.labels.push(like.el);
      }

      for (const message of messages) {
        this.numbers2.push(message.count);
        this.labels2.push(message.el);
      }
      this.showChart = true;
    }

  }

  ngOnInit() {
  }

}
