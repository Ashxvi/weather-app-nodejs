const yargs = require('yargs');
const axios = require('axios');

// **************** Our App Using Axios that uses  ****************

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

var encodedAddress = encodeURIComponent(argv.address);
var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeURL)
.then((response) => {

  if(response.data.status === 'ZERO_RESULTS'){
    throw new Error('Could not find address.');
  }

  else {

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherURL = `https://api.darksky.net/forecast/your-api-key/${lat},${lng}`;

    console.log('Address : ', response.data.results[0].formatted_address);

    return axios.get(weatherURL); // Returning another promise
  }

})
.then((response) => {
  // We don't have to handle erros, if there are results, it means it works
  console.log('Temperature : ', response.data.currently.temperature);
  console.log('Apparent Temperature : ', response.data.currently.apparentTemperature);
  console.log('Humidity : ', response.data.currently.humidity);

})
.catch((e) => {
  if(e.code === 'ENOTFOUND'){ // error not null
    console.log('Could not connect to Google Servers.');
  }
  else{
    console.log(e.message);

  }
});
