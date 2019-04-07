import {Injectable} from '@angular/core';
import {Papa} from 'ngx-papaparse';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http: HttpClient, public csv: Papa) {
  }

  getPromise(url: string) {
    let fullData = '';
    return new Promise((resolve, reject) => {
      this.http.get(url, {responseType: 'text'})
        .subscribe(
          data => {
            fullData += data;
          },
          error => {
            reject(error);
          },
          () => {
            // now parse the csv data
            try {
              resolve(fullData);
            } catch (error) {
            }
          }
        );
    });
  }

  async getDataFromFile(type, column, url) {
    const savings: any = await this.getPromise(url);
    switch (type) {
      case 'amazon' :
        switch (column) {
          case 'activity':
            let dates = [];
            const separated = savings.split("\n");
            if (separated) {
              for (let line of separated) {
                const regex = /^"(\d+\/\d+\/\d+)/gm;
                const data = regex.exec(line);
                if (data !== null && data[1]) {
                  dates.push(data[1]);
                }
              }
            }
            return this.countQuantity(dates);
            break;
          case 'operating system' :
            let os = [];
            const lines = savings.split("\n");
            if (lines) {
              for (let line of lines) {
                const regex = /(Windows|Android)/gm;
                const data = regex.exec(line);
                if (data !== null) {
                  os.push(data[0]);
                }
              }
            }
            return this.countQuantity(os);
            break;
          case 'duration':
            const lines2 = savings.split("\n");
            const durations = [];
            const durationsW = [];
            let sumHours = 0;
            let sumMinutes = 0;
            if (lines) {
              for (let line of lines2) {
                const regex = /(\d+\:\d+\.0)/;
                const data = regex.exec(line);
                if (data !== null) {
                  durations.push(data[0]);
                }
              }
              for (const i in durations) {
                durationsW.push(durations[i].split(":"));
              }
              for (const j in durationsW) {
                sumHours += Number(durationsW[j][0]) / durationsW.length;
                sumMinutes += Number(durationsW[j][1]) / durationsW.length;
              }
              const sum = Math.round(sumHours * 60 + sumMinutes);
              const minutes = sum % 60;
              const hours = (sum - minutes) / 60;
              const result = [hours, minutes]
              console.log(result);
              return result;
            }
            break;
          case 'get times':
            const times = savings.split("\n");
            const timeList = [];
            let hoursT = [];
            if (times) {
              for (const time of times) {
                const regex = /(\d+\:\d+)/;
                const data = regex.exec(time);
                if (data !== null) {
                  timeList.push(data[0]);
                }
              }
              for (const i in timeList) {
                hoursT.push(timeList[i].split(":")[0]);
              }
              return this.countQuantity(hoursT);
            }
        }
        break;
      case 'google' :
        switch (column) {
          case 'location history timestamps' :
            const locations = savings.locations;
            const times = [];
            const rows = [];
            for (const line of locations) {
              times.push(this.getDateFromTimeStamp(line.timestampMs));
            }
            return times;
            break;
        }
        break;
      case 'facebook' :
        break;
      case 'instagram':
        switch (column) {
          case 'media likes' :
            const instagramLikes = [];
            const instagramData = savings.media_likes;
            for (const line of instagramData) {
              instagramLikes.push([
                line[0],
                line[1]
              ]);
            }
            return instagramLikes;
            break;

          case 'profile' :

            return String(savings.username);

            break;

          case 'messages' :

            const instagramMessages = [];
            const instagramMessagesData = savings;
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

            break;

        }
        break;
    }
  }

  getDateFromTimeStamp(timestamp) {
    const date = new Date(timestamp);
    let day = date.getDate().toString();
    if (date.getDate() < 10) {
      day = '0' + day;
    }
    let month = date.getMonth().toString();
    if (date.getMonth() < 10) {
      month =  '0' + month;
    }
    const year = date.getFullYear().toString();
    const dateStr = day + '.' + month + '.' + year;
    return dateStr;
  }

  async countQuantity(data) {
    return data.reduce((b, c) => ((b[b.findIndex(d => d.el === c)] || b[b.push({el: c, count: 0}) - 1]).count++, b), []);
  }

}
