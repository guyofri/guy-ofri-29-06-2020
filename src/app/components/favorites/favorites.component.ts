import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  public http: HttpClient;
  public favoritesService: any;
  public favoriteCities: FavoriteCity[];

  constructor(http: HttpClient, favoritesService: FavoritesService) {
    this.http = http;
    this.favoritesService = favoritesService;
  }

  ngOnInit() {
    this.favoriteCities = this.favoritesService.getFavorites();
  }
}
