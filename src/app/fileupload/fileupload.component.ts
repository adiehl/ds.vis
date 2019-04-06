import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})

export class FileuploadComponent {
  public dataTypes = [];
  public fileType = 'amazon_searches';
  constructor(public db: DatabaseService) {
    this.dataTypes = db.dataTypes;
  }
  handleFileInput(files) {
    const reader = new FileReader();
    const file = files[0];
    reader.readAsText(file); // fires onload when done.
    reader.onload = (event) => {
      const save = reader.result;
      console.log(save); // {hp: 32, maxHp: 50, mp: 11, maxMp: 23}
      this.db.saveFile(this.fileType, save.toString());
    };
  }
  //
  // handleFileRead(event) {
  //   const save = JSON.parse(event.target.result);
  //   console.log(save); // {hp: 32, maxHp: 50, mp: 11, maxMp: 23}
  //   window.localStorage.setItem(FILE_KEY, JSON.stringify(save));
  // }

}
