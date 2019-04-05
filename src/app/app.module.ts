import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { AmazonService } from './services/amazon.service';
import { FacebookService } from './services/facebook.service';
import { GoogleService } from './services/google.service';
import { InstagramService } from './services/instagram.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
     AmazonService,
     FacebookService,
     GoogleService,
     InstagramService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
