import { Component, ChangeDetectorRef } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { CurrentWeather } from '../../models/current.weather.model';
import { HomeService } from '../../services/home.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public weatherContainer: WeatherContainer;
  public currentWeather: CurrentWeather;
  public cities: City[] = [];
  public cityName: string = "Tel Aviv";
  public city: City = { Key: 215854, LocalizedName: "Tel Aviv" };
  public favoriteCity: FavoriteCity;
  public cityId: number;
  public favoriteCities: FavoriteCity[] = [];
  public favoritesService: FavoritesService;
  public readonly homeService: HomeService;
  public citiesDropDownList: City[] = [];
  public forecasts: Forecast[];
   

  constructor(favoritesService: FavoritesService,
    homeService: HomeService,  cdRef: ChangeDetectorRef)
  {
    this.favoritesService = favoritesService;
    this.homeService = homeService;
  }

  ngOnInit() {
    this.currentWeather = { unit: '', localObservationDateTime: '', temperature: 0, weatherText: '' };
    this.favoriteCity = { unit: '', temperature: 0, weatherText: '', Key: 0, LocalizedName: '' };
    this.getCities();
    this.favoriteCities = this.favoritesService.getFavorites();
    this.cityName = this.city.LocalizedName;
    if (!this.cities || this.cities.length == 0)
      this.cities.push(this.city);
  }

  getCitiesByPrefix() {
    if (this.cityName.length < 2)
      return;

    this.citiesDropDownList = this.cities.filter(x => x.LocalizedName.toLowerCase().startsWith(this.cityName.toLowerCase()));
  }

  getWeatherByCity(cityInput) {
    let cityName = cityInput.currentTarget ? cityInput.currentTarget.innerText : cityInput;

    let city: City = this.cities.find(x => x.LocalizedName.toLowerCase() == cityName.toLowerCase());
    if (city) {
      this.city = city;
      this.cityName = (this.city.LocalizedName);
      this.cityId = this.city.Key;
      this.getCurrentWeather(this.cityId);
      this.getFiveDaysForecasts(this.cityId);
    }
    this.citiesDropDownList = [];
  }

  getCities(): void {
    this.homeService.getCities().subscribe(
      (response) => {
        this.cities = response;
        this.getWeatherByCity(this.cityName);
      });
  }

  addToFavorites(): void {
    let favorite = this.favoriteCities.find(x => x.Key == this.city.Key);
    if (!favorite) {
      if (this.currentWeather) {
        this.favoriteCity.temperature = this.currentWeather.temperature;
        this.favoriteCity.unit = this.currentWeather.unit;
        this.favoriteCity.weatherText = this.currentWeather.weatherText;
        this.favoriteCity.Key = this.city.Key;
        this.favoriteCity.LocalizedName = this.city.LocalizedName;
      }
      this.favoriteCities = this.favoritesService.addToFavorites(this.favoriteCity);
    }
  }

  removeFavorite(): void {
    let city = this.favoriteCities.find(x => x.Key == this.city.Key);
    if (city) {
      if (this.currentWeather) {
        city.temperature = this.currentWeather.temperature;
        city.unit = this.currentWeather.unit;
        city.weatherText = this.currentWeather.weatherText;
      }
      this.favoriteCities = this.favoritesService.removeFavorite(this.city as FavoriteCity);
    }
  }

  isInFavorites(): boolean {
    return this.favoriteCities.find(x => x.Key == this.city.Key) ? true : false;
  }

  getCurrentWeather(cityId: number): void {
    this.cityId = cityId;
    this.homeService.getCurrentWeather(cityId).subscribe(
      (result) => {
        
        this.currentWeather.temperature = result[0].Temperature.Metric.Value;
        this.currentWeather.unit = result[0].Temperature.Metric.Unit;
        this.currentWeather.weatherText = result[0].WeatherText;
      });
  }

  getFiveDaysForecasts(cityId: number): void {
    this.cityId = cityId;
    this.homeService.getFiveDaysForecasts(cityId).subscribe(
      (result) => {
        this.weatherContainer = result;
        this.forecasts = this.weatherContainer.DailyForecasts;
      });
  }
}


