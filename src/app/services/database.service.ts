import { Injectable } from '@angular/core';
import { Store, set, get, clear } from 'idb-keyval';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  public indexedDb: any;
  public dataTypes = [
    {name: 'example_data', label: 'Example Data' },
    {name: 'amazon_searches', label: 'Amazon Searches' },
    {name: 'google_searches', label: 'Google Searches' },
    {name: 'facebook_activity', label: 'Facebook Account Acitivity',
      description: 'You can upload the file security_and_login_information/account_acitivity.json' },
    {name: 'instagram_likes', label: 'Instagram Likes',
      description: 'You can upload the file likes.json' }
  ];

  constructor() {
  }

  public async saveFile(filename, filecontent) {
    await set(filename, filecontent);
  }
  public async clear() {
    await clear();
  }

  public async getFile(filename) {
    const filecontent = await get(filename);
    return filecontent;
  }
}
