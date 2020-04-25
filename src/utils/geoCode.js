const request = require('request')

const geoCode = (address, callback) => {
  const geoUrl =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoic3R1dGlhZ3Jhd2FsIiwiYSI6ImNrOHZraDh2bzBiYzEzbG80bjhweDQ0bHMifQ.ZYsEfgk8EvUubnoJ0oGE8w";

  request({ url: geoUrl, json: true }, (error, response) => {
    if (error) callback("Unable to connect to location server", undefined);
    else {
      if (response.body.features.length === 0)
        callback("Unable to find location. Try another search", undefined);
      else {
        let latitude = response.body.features[0].center[1],
          longitude = response.body.features[0].center[0];
          callback(undefined, { latitude, longitude, location: response.body.features[0].place_name });
      }
    }
  });
}; 

module.exports =  geoCode
