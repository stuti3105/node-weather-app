const request = require('request')

const foreCast = (latitude, longitude, callback)=>{
    const url =
        "http://api.weatherstack.com/current?access_key=aa390766f945d67b4bc7870b1ae6993a&query=" + latitude + "," + longitude;

    request({ url, json: true }, (error, {body}) => {
        if (error) {
           callback("Unable to connect to weather server", undefined);
        } else if (body.error) {
            callback("Unable to find location", undefined);
        } else {
            callback(undefined, 
                body.current.weather_descriptions[0] +
                ". It is currently " +
                body.current.temperature +
                " degrees out. It feels like " +
                body.current.feelslike +
                " degrees."
            );
        }
    });
}
module.exports = foreCast