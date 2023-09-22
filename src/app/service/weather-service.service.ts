import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Weatherdata } from '../models/weather.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  constructor(private http:HttpClient) { }
  private readonly apiUrl = environment.weatherApiBaseUrl
  private readonly apiKey = environment.openWeatherMapKey

  getWeather(city:string|null):Observable<Weatherdata>{
    return this.http.get<Weatherdata>(`${this.apiUrl}?q=${city}&appid=${this.apiKey}`)
  }
}