require('dotenv').config();
const bodyParser = require('body-parser');
const axios = require('axios');
const ejs = require('ejs');
const express = require('express');
const { response } = require('express');
const { default: Axios } = require('axios');
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.route('/')
    .get((req, res) => res.render('index'))
    .post((req, res) => {
        const city = req.body.cityInput;
        const cityName = city.charAt(0).toUpperCase() + city.slice(1);
        const openweathermapAPI_KEY = process.env.OPENWEATHER_API_KEY;
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${openweathermapAPI_KEY}`;
        
        axios
            .get(url)
            .then(response => {
                console.log(response.data);
                res.render('index', {weatherData: response.data});
            })
            .catch(error => {
                console.log(error);
                res.render('index', {error: 'An error occurred!'});
            });
    });


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App 🏃 on port ${PORT}...`);
});