import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UrlInterceptor } from './shared/http.injection';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';






@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
],
  providers: [
    {  
      provide: HTTP_INTERCEPTORS,  
      useClass: UrlInterceptor,  
      multi: true  
    } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
