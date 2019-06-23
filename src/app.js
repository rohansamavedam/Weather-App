const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./util/geocode')
const forecast = require('./util/forecast')

//Creating a express app
const app = express()

//Path config 
const publicDir = path.join(__dirname,'../public')
const viewDir = path.join(__dirname,'../templates/views')
const parDir = path.join(__dirname,'../templates/partials')

//Handlebars and view locations
app.set('view engine', 'hbs')
app.set('views', viewDir)
hbs.registerPartials(parDir)

//Static data
app.use(express.static(publicDir)) 

app.get('', (req, res) => {
    res.render('index', {  
        title: 'weather',
        name: 'rohan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about',
        name: 'rohan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'help',
        name:'rohan'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'address must be provided'
        })
    }
    const add = req.query.address
    geocode(add, (error, {lat, long, location} = {}) => {
        if(error){
            return res.send({ error })
        }
        forecast(lat, long, (error, currentWeather) => {
            if(error){
                return res.send({ error })
               
            }
            res.send({
                forecast: currentWeather,
                location: location
            })
        })

    })
    // res.send({
    //     forecast: 'weather sucks' , //we are sending a json file here
    //     location: 'what ever location',
    //     address: req.query.address
    // })
})

app.get('*', (req, res) => {
    res.render('error',{
        title: '404',
        name: 'rohan'
    })
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})