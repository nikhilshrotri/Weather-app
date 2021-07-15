const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const port = process.env.PORT || 3000
const app = express();

const apiKey = "4ac1f94f27ae19457b468363ab27331b";

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('index', {weather: null, error: null});
});

app.post('/', function(req, res){
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    console.log(req.body.city);
    request(url, function(err, response, body){
        if(err){
            res.render('index', {weather: null, error: 'Error, please try again!'});
        }
        else{
            let weather = JSON.parse(body);
            if(weather.main == undefined){
                res.render('index', {weather: null, error: 'Error, please try again!'});
            }
            else{
                let weatherText = `It's ${weather.main.temp} degrees Celsius with ${weather.weather[0].main} in ${weather.name}!`;
                res.render('index', {weather: weatherText, error: null});
                console.log("body:",body);
            }
        }
    });
});

app.listen(port, function () {
    console.log("Weatherly App is listening on port 3000");
});
