const request = require('request');

const googleKey = 'AIzaSyCi8dL1xeegOB6o9JCoRfvmtyJsMEs48ME';
const forecastKey = '53205e6802b77856ae3f3738a37ef17d';

let geocodeAddress = (address, callback) => {
    address = encodeURIComponent(address);
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleKey}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Error calling google APIs');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Cannot find the address');
        } else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                lat: body.results[0].geometry.location.lng,
                lng: body.results[0].geometry.location.lat
            });
        }
    });
};

let getWeatherInfo = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${forecastKey}/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (response.statusCode !== 200) {
            callback(body.error);
        } else {
            callback(undefined, body.currently.temperature);
        }
    });
};

module.exports = {
    geocodeAddress,
    getWeatherInfo
};