interface WeatherClient {
  getCurrentWeather(): {
    tempCelsius: number;
    humidPercent: number;
    raining: boolean;
    description: string;
  };
}

class OldWeatherService {
  constructor() {}

  fetch(): {
    data: {
      temperature: number;
      humidity: number;
      rain: boolean;
      description: string;
    };
  } {
    return {
      data: {
        temperature: 25,
        humidity: 50,
        rain: false,
        description: 'cloudy with a breeze',
      },
    };
  }
}

class WeatherAdapter implements WeatherClient {
  private legacy: OldWeatherService;

  constructor(legacy: OldWeatherService) {
    this.legacy = legacy;
  }

  getCurrentWeather(): {
    tempCelsius: number;
    humidPercent: number;
    raining: boolean;
    description: string;
  } {
    const legacyData = this.legacy.fetch();

    return {
      tempCelsius: legacyData.data.temperature,
      humidPercent: legacyData.data.humidity,
      raining: legacyData.data.rain,
      description: legacyData.data.description,
    };
  }
}

const legacy = new OldWeatherService();
const adapter = new WeatherAdapter(legacy);

const currentWeather = adapter.getCurrentWeather();
console.log(currentWeather);
