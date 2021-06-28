import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { WeatherService } from './weather.service';

interface Data {
  base: string;
  clouds: object;
  cod: number;
  coord: {lon: number; lat: number;}
  dt: number;
  id: number;
  main: {feels_like: number; humidity: number; pressure: number; temp: number; temp_max: number; temp_min: number;}
  name: string;
  sys: object;
  weather: [{description: string; icon: string; id: number; main: string;}]
  wind: object;
}


const Unit: String[] = ['metric', 'standard', 'imperial'];

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  public isSubmitted = false;
  public data: string = '';
  public iconSrc: string  = '';
  public City: String[] = ['Kyiv', 'Tel Aviv'];
  public form = new FormGroup({
    cityName: new FormControl('', Validators.required),
    unit: new FormControl(null, [Validators.required, this.unitTypeValidator]),
  });
  @Output() sendWeather = new EventEmitter<string>();

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void { }

  public prepareToSendData() {
    let city = this.form.value.cityName;
    let unit = this.form.value.unit;
    this.getWeather(city, unit);
  }

  public getWeather(city: string, unit: string){
    this.weatherService.getWeather$(city, unit).subscribe((res : any) => {
      this.data = `${res.name} ${res.main.temp}°`;
      this.iconSrc = `http://openweathermap.org/img/w/${res.weather[0].icon}.png`;
      return this.buildStringForOutput(this.data, res);
    });
  }


  public buildStringForOutput(data: string, res :Data) {
    let weather = res.weather[0].description;
    let message = `${data} – ${weather}`;
    this.sendWeather.emit(message);
  }

  //custom validator for unit input
  public unitTypeValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (Unit.indexOf(control.value) === -1) {
      return { unitType: true };
    }
    return null;
  }
}
