import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicModule } from './publicModule/public.module';
import { SharedModule } from './sharedModule/shared.module';
import { ProtectedModule } from './protectedModule/protected.module';
import { HttpClientModule } from '@angular/common/http';
//import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService } from './core-module/in-memory-data.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
//import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService,  { dataEncapsulation: false }),
    ProtectedModule,
    PublicModule,
    SharedModule,
    AppRoutingModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
