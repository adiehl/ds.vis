import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PapaParseModule } from 'ngx-papaparse';

import { AmazonService } from './services/amazon.service';
import { FacebookService } from './services/facebook.service';
import { GoogleService } from './services/google.service';
import { InstagramService } from './services/instagram.service';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [ // Hier werden externe Module eingetragen
    BrowserModule,
    HttpClientModule,
    PapaParseModule,
  ],
  providers: [ // Hier werden die eigenen Services eingetragen
     AmazonService,
     FacebookService,
     GoogleService,
     InstagramService,
     DataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
