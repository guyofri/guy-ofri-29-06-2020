interface City {
  Key:number
  LocalizedName: string;
}

interface FavoriteCity extends City {
  temperature: number;
  unit: string
  weatherText: string;
}
