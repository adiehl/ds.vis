import { Component, OnInit } from '@angular/core';
import { InstagramService } from '../services/instagram.service';

@Component({
  selector: 'app-instagram',
  templateUrl: './instagram.component.html',
  styleUrls: ['./instagram.component.scss']
})
export class InstagramComponent implements OnInit {

  public output = '';
  public numbers = [];
  public labels = [];
  public showChart = false;

  constructor(public instagram: InstagramService) {
    this.loadChart();
  }

  public async loadChart() {
    const likes = await this.instagram.getLikesPerDay();

    for (const like of likes) {
      this.numbers.push(like.count);
      this.labels.push(like.el);
    }
    this.showChart = true;
    // this.output = JSON.stringify(likes);
  }

  ngOnInit() {
  }

}
