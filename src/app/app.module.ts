import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherComponent } from './component/weather/weather.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { ConvertPipe } from './shared/custom.pipe';
import { DateFormatPipe } from './shared/dateFormate.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './common/spinner/spinner.component';
import { LoadingInterceptor } from './common/loading.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    ConvertPipe,
    DateFormatPipe,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule ,
    FormsModule   
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
