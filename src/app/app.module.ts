import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherComponent } from './component/weather/weather.component';
import { HttpClientModule } from '@angular/common/http'
import { ConvertPipe } from './shared/custom.pipe';
 

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    ConvertPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
