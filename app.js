const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        address: {
            describe: 'Address',
            demand: true,
            alias: 'a',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var address = encodeURIComponent(argv.address);
const googleKey = 'AIzaSyCi8dL1xeegOB6o9JCoRfvmtyJsMEs48ME';
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleKey}`;
const forecastKey = '53205e6802b77856ae3f3738a37ef17d';

axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Cannot find address');
    }
    let lat = response.data.results[0].geometry.location.lat;
    let lng = response.data.results[0].geometry.location.lng;
    var weatherURl = `https://api.darksky.net/forecast/${forecastKey}/${lat},${lng}`
    return axios.get(weatherURl);
}).then((response) => {
    let temp = response.data.currently.temperature;
    let appTemp = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temp}, but it feels like ${appTemp}.`);
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Cannot connect to servers');
    } else {
        console.log(e.message);
    }
});