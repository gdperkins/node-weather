const request = require('request');

const forecastKey = '53205e6802b77856ae3f3738a37ef17d';

let getWeatherInfo = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${forecastKey}/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (response.statusCode !== 200) {
            callback(body.error);
        } else {
            callback(undefined, {
                temp: body.currently.temperature,
                apparantTemp: body.currently.apparentTemperature
            });
        }
    });
};

module.exports = {
    getWeatherInfo
};