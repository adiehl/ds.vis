import { Component } from '@angular/core';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})

export class FileuploadComponent {
  public dataTypes = [
    {name: 'example_data', label: 'Example Data' },
    {name: 'amazon_searches', label: 'Amazon Searches' },
    {name: 'google_searches', label: 'Google Searches' },
    {name: 'instagram_searches', label: 'Instagram Searches' }
  ];
  public fileType = 'amazon_searches';

  handleFileInput(files) {
    const reader = new FileReader();
    const file = files[0];
    reader.readAsText(file); // fires onload when done.
    reader.onload = (event) => {
      const save = reader.result;
      console.log(save); // {hp: 32, maxHp: 50, mp: 11, maxMp: 23}
      window.localStorage.setItem('xx', save.toString());
    };
  }
  //
  // handleFileRead(event) {
  //   const save = JSON.parse(event.target.result);
  //   console.log(save); // {hp: 32, maxHp: 50, mp: 11, maxMp: 23}
  //   window.localStorage.setItem(FILE_KEY, JSON.stringify(save));
  // }

}
