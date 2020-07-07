interface WeatherContainer {
  DailyForecasts: Forecast[];
}

interface Forecast {
  temperature: number;
  date: string;
  unit: string;
  value: number;
}
