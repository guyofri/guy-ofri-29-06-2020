import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favoriteCities: FavoriteCity[] = [];

  constructor() { }

  addToFavorites(city: FavoriteCity): FavoriteCity[] {
    this.favoriteCities.push(city);
    return this.favoriteCities;
  }

  removeFavorite(city: FavoriteCity): FavoriteCity[] {
    let cityIndex = this.favoriteCities.indexOf(city);
    this.favoriteCities.splice(cityIndex,1);
    return this.favoriteCities;
  }

  getFavorites(): FavoriteCity[] {
    return this.favoriteCities;
  }
}
