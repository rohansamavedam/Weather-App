const request = require('request')

const forecast = (long, lat, callback) => {
    const url = 'https://api.darksky.net/forecast/e9f154f35724b35efcf40c164f0d6a1b/'+long+','+lat
    request({url, json: true},(error, { body }) => {
        if(error){
            callback('network problem',undefined)
        }else if(body.error){
            callback('problem connecting to api', undefined)
        }else{
            const data = body.currently
            callback(undefined, {
                temp: data.temperature,
                summary: data.summary,
                rain: data.precipProbability
            })
        }
    })
}

module.exports = forecast