import { Component, OnInit } from '@angular/core';
import { WeatherserviceService } from './services/weatherservice.service';
import { WeatherData } from './models/weather.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  weatherInfo: Subscription | undefined;
  weatherData!:WeatherData;
  cityName:string = 'Bengaluru';

  constructor(private weatherService:WeatherserviceService){}

  ngOnInit(): void {
    this.getWeatherData(this.cityName);
    this.cityName = '';

  }

  onSubmit(){
    this.getWeatherData(this.cityName);
    this.cityName = '';
  }

  getWeatherData(cityName:string){
    this.weatherInfo = this.weatherService.getWeatherData(cityName).subscribe({
      next:(res)=>{
        console.log(res);
        this.weatherData = res;
        
      },
      error:(err)=>{
        alert('invalid city name')
        console.log(err.message);
        
      }
    })
  }

  ngOnDestroy(){
    if(this.weatherInfo){
      this.weatherInfo.unsubscribe();
    }
  }
}
