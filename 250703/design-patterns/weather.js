"use strict";
class OldWeatherService {
    constructor() { }
    fetch() {
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
class WeatherAdapter {
    constructor(legacy) {
        this.legacy = legacy;
    }
    getCurrentWeather() {
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
