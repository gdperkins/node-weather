const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

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

geocode.geocodeAddress(argv.address, (error, address) => {
    if (error) {
        console.log(error);
    } else {
        console.log(JSON.stringify(address, undefined, 2));
        weather.getWeatherInfo(address.lat, address.lng, (err, weather) => {
            if (err) {
                console.log(err);
            } else {
                console.log('--')
                console.log(`Temperature: ${weather.temp}`);
                console.log(`Apparent Temperature: ${weather.apparantTemp}`);
            }
        });
    }
});