import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
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
import { FileuploadComponent } from './fileupload/fileupload.component';
import { DatabaseService } from './services/database.service';
import { TimeChartComponent } from './time-chart/time-chart.component';
import { HelpComponent } from './help/help.component';

@NgModule({
  declarations: [
    AppComponent,
    AmazonComponent,
    GoogleComponent,
    FacebookComponent,
    InstagramComponent,
    ExampleComponent,
    FileuploadComponent,
    TimeChartComponent,
    HelpComponent
  ],
  imports: [ // Hier werden externe Module eingetragen
    BrowserModule,
    HttpClientModule,
    PapaParseModule,
    MatTabsModule,
    BrowserAnimationsModule,
    FormsModule,
    ChartsModule,
  ],
  providers: [ // Hier werden die eigenen Services eingetragen
     AmazonService,
     FacebookService,
     GoogleService,
     InstagramService,
     DataService,
     DatabaseService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
