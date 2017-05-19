const request = require('request'); // Doesn't use ES6 promises natively


// **************** Using callbacks ****************


var getWeather = (lat,lng, callback) => {

request({
  url: `https://api.darksky.net/forecast/your-api-key/${lat},${lng}`,
  json: true
}, (error, response, body) => {

  if(!error && response.statusCode === 200){
    callback(undefined, {
      temperature: body.currently.temperature,
      apparentTemperature: body.currently.apparentTemperature,
      humidity: body.currently.humidity

    });


  }
  else {
    callback('Could not get weather.');
  }

});

};


// **************** Using ES6 promises ****************
/*
var getWeather = (lat,lng) => {

return new Promise((resolve, reject) => {

  request({
    url: `https://api.darksky.net/forecast/02e3bb5afa458cae848ab800a3dd75eb/${lat},${lng}`,
    json: true
  }, (error, response, body) => {

    if(!error && response.statusCode === 200){
      resolve({
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature,
        humidity: body.currently.humidity

      });


    }
    else {
      reject('Could not get weather.');
    }

  });


});

};

*/

module.exports = {
  getWeather
};
