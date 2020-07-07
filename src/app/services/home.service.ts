import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly http: HttpClient;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private readonly apiKey: string = "JicMioOCckHDs8juozyV0C6AGt6C40fi";

  constructor(http: HttpClient)
  {
    this.http = http;
  }

  getCities(): Observable<any[]> {
    let url = "https://cors-anywhere.herokuapp.com/dataservice.accuweather.com/locations/v1/topcities/150?apikey=" + this.apiKey + "&language=en-us&details=false";
    return this.http.get<any>(url, this.httpOptions);
  }

  getCurrentWeather(cityId: number): Observable<any[]> {
    let url = "https://cors-anywhere.herokuapp.com/dataservice.accuweather.com/currentconditions/v1/" + cityId + "?apikey=" + this.apiKey;
    return this.http.get<any>(url, this.httpOptions);
  }

  getFiveDaysForecasts(cityId: number): Observable<WeatherContainer> {
    let url = "https://cors-anywhere.herokuapp.com/dataservice.accuweather.com/forecasts/v1/daily/5day/" + cityId + "?apikey=" + this.apiKey;
    return this.http.get<WeatherContainer>(url, this.httpOptions);
  }
}
