const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const forecast = require('./forecast/forecast');

const argv = yargs
  .options({
    a: {
      demand: true,
      string: true, // Always parse the address command as a string
      describe: 'Address to get weather for',
      alias: 'address'
    }
  })
  .help()
  .alias('help', 'h')
  .argv;


  // **************** Using callbacks ****************


geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if(errorMessage){
    console.log(errorMessage);
  }
  else {

    forecast.getWeather(results.lat, results.lng, (error, info) => {
      console.log(`Address : ${results.address}`);
      console.log(`Temperature : ${info.temperature}`);
      console.log(`Apparent Temperature : ${info.apparentTemperature}`);
      console.log(`Humidity : ${info.humidity}`);

    } );
  }

});


// **************** Using ES6 promises ****************
/*
geocode.geocodeAddress(argv.address).then((geocode_results) => {

  return forecast.getWeather(geocode_results.lat, geocode_results.lng);

})
.then((weather_results) => {

  console.log(`Address : ${weather_results.address}`);
  console.log(`Temperature : ${weather_results.temperature}`);
  console.log(`Apparent Temperature : ${weather_results.apparentTemperature}`);
  console.log(`Humidity : ${weather_results.humidity}`);

})
.catch((errorMessage)=> {

  console.log(errorMessage);

});
*/
