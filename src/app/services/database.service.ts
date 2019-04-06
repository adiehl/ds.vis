import { Injectable } from '@angular/core';
import { Store, set, get } from 'idb-keyval';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  public indexedDb: any;
  public dataTypes = [
    {name: 'example_data', label: 'Example Data' },
    {name: 'amazon_searches', label: 'Amazon Searches' },
    {name: 'google_searches', label: 'Google Searches' },
    {name: 'instagram_searches', label: 'Instagram Searches' }
  ];

  constructor() {
  }

  public async saveFile(filename, filecontent) {
    await set(filename, filecontent);
  }

  public async getFile(filename) {
    const filecontent = await get(filename);
    return filecontent;
  }
}
