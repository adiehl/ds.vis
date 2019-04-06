import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PapaParseModule } from 'ngx-papaparse';

import { AmazonService } from './services/amazon.service';
import { FacebookService } from './services/facebook.service';
import { GoogleService } from './services/google.service';
import { InstagramService } from './services/instagram.service';
import { DataService } from './services/data.service';
import { AmazonComponent } from './amazon/amazon.component';
import { GoogleComponent } from './google/google.component';
import { FacebookComponent } from './facebook/facebook.component';
import { InstagramComponent } from './instagram/instagram.component';
import { ExampleComponent } from './example/example.component';

@NgModule({
  declarations: [
    AppComponent,
    AmazonComponent,
    GoogleComponent,
    FacebookComponent,
    InstagramComponent,
    ExampleComponent
  ],
  imports: [ // Hier werden externe Module eingetragen
    BrowserModule,
    HttpClientModule,
    PapaParseModule,
    MatTabsModule,
    BrowserAnimationsModule
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
