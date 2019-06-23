const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoicm9oYW5zYW1hdmVkYW0xIiwiYSI6ImNqeDQ5MGJ5ZTA2bWE0YXJ2N2VlZXd5bG0ifQ.XfE8ow2kH1VWTFr-VkaJ1Q&limit=1'
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('There is a network error', undefined)
        }else if(body.features.length===0){
            callback('invalid place name, enter a differnt place', undefined)
        }else{
            const data = body
            callback(undefined,{
                long: data.features[0].geometry.coordinates[0],
                lat: data.features[0].geometry.coordinates[1],
                location: data.features[0].place_name
            })
        }
    })
}

module.exports = geocode