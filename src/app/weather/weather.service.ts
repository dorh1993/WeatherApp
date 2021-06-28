import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }
  private rootURL = '/api';
  private appId: string = '0d7303c17ee3d3482cd82a2ad273a90d';
  
  public getWeather$(city: string, unit: string): Observable<object> {
    return this.http.get(this.rootURL + `?q=${city},${unit}&appid=${this.appId}`).pipe(map(data => data));
  }

}
