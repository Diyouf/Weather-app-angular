import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Weatherdata } from 'src/app/models/weather.model';
import { WeatherServiceService } from 'src/app/service/weather-service.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit{

  constructor(private _weatherAppService : WeatherServiceService,private _fb:FormBuilder){}
  weatherData!:Weatherdata
  dateAndDay!:Date 
  Day!:string
  Time!:string
  temperature!:number
  dailyTemperatures: { dateKey: string; dailyTemp: number }[] = [];

  city = this._fb.group({
    name : ['']
  })


  ngOnInit(): void {
    this.city.get('name')!.setValue('Kochi');
    this.onSubmit()
 }

 onSubmit(){
  this._weatherAppService.getWeather(this.city.value.name as string).subscribe(
    (res) => {
      this.weatherData = res;              
      this.temperature = (res.list[0].main.temp - 273.15)
      const timezoneOffsetSeconds = this.weatherData.city.timezone;
      const currentUTCTimestampMilliseconds = Date.now();
      const localTimestampMilliseconds = currentUTCTimestampMilliseconds + (timezoneOffsetSeconds);
      this.dateAndDay = new Date(localTimestampMilliseconds);
      this.formatDate(this.dateAndDay);
      this.dailyTemperatures = []
      this.calculateDailyTemperatures()
      
    },
    (error) => {
      console.error('Error fetching weather data:', error);
    }
  );
 }

   formatDate(inputDate:Date) {
    const date = new Date(inputDate);
  
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayOfWeek = daysOfWeek[date.getDay()];
  
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
  
    const formattedTime = `${formattedHours}:${minutes.toString().padStart(2, "0")} ${amPm}`;
  
    this.Day = dayOfWeek
    this.Time = formattedTime
  }

  get weatherCondition(): string {
    if (this.temperature < 0) return 'manj';
    if (this.temperature < 10) return 'manj';
    if (this.temperature < 20) return 'kaat';
    if (this.temperature < 30) return 'maya';
    return 'suryan - thijj';
  }

  get weatherImageSrc(): string {
    return `assets/${this.weatherCondition}.png`;
  }


  calculateDailyTemperatures() {
    const temperatureMap = new Map<string, number>(); // Change the map value type to number
  
    for (const weatherEntry of this.weatherData.list) {
      const dateKey = weatherEntry.dt_txt.split(' ')[0]; // Extract date part
      const temperature = weatherEntry.main.temp;
  
      // Check if the entry exists, if not, create it
      if (!temperatureMap.has(dateKey)) {
        temperatureMap.set(dateKey, temperature);
      }
    }
  
    temperatureMap.forEach((temperature, dateKey) => {
      this.dailyTemperatures.push({ dateKey, dailyTemp: temperature }); // Use dailyTemp instead of dailyAvgTemp
    });
  }
  

}

 



