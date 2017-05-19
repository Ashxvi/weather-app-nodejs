const request = require('request'); // Doesn't use ES6 promises natively

// **************** Using callbacks ****************

 var geocodeAddress = (address, callback) => {

  const encodedAddress = encodeURIComponent(address);

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
    // body is a javascript object, we've to stringify it to show its full content
    // console.log(JSON.stringify(body, undefined, 2));
    if(error){ // error not null
      callback('Could not connect to Google Servers.');
    }
    else if (body.status === 'ZERO_RESULTS') {
      callback('Could not find address.');

    }
    else if (body.status === 'OK'){
      callback(undefined, {
        address: body.results[0].formatted_address,
        lat: body.results[0].geometry.location.lat,
        lng: body.results[0].geometry.location.lng
      });

    }

  });

};


// **************** Using ES6 promises ****************

/*
var geocodeAddress = (address) => {

  return new Promise( (resolve, reject) => {

    const encodedAddress = encodeURIComponent(address);

    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
      json: true
    }, (error, response, body) => {
      // body is a javascript object, we've to stringify it to show its full content
      // console.log(JSON.stringify(body, undefined, 2));
      if(error){ // error not null
        reject('Could not connect to Google Servers.');
      }
      else if (body.status === 'ZERO_RESULTS') {
        reject('Could not find address.');

      }
      else if (body.status === 'OK'){
        resolve({
          address: body.results[0].formatted_address,
          lat: body.results[0].geometry.location.lat,
          lng: body.results[0].geometry.location.lng
        });

      }

    });

  });
};

*/





module.exports = {
  geocodeAddress
};
