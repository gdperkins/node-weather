const yargs = require('yargs');

const geocode = require('./geocode.js')

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
        geocode.getWeatherInfo(address.lat, address.lng, (err, weather) => {
            if (err) {
                console.log(err);
            } else {
                console.log('--')
                console.log(`Temperature: ${weather}`);
            }
        });
    }
});