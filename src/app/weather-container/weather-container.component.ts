import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-container',
  templateUrl: './weather-container.component.html',
  styleUrls: ['./weather-container.component.scss']
})
export class WeatherContainerComponent implements OnInit {
  public Weather: Array<string> = [];
  constructor() { }

  ngOnInit(): void {
  }


  public saveWeather($event: string) {
    this.Weather.push($event);
  }
}
