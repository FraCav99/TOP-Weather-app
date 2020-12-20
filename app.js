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
app.use(express.static(__dirname + '/public/'));


const openweathermapAPI_KEY = process.env.OPENWEATHER_API_KEY;
const giphyAPI_KEY = process.env.GIPHY_API_KEY;

app.route('/')
    .get((req, res) => res.render('index'))
    .post(async (req, res) => {
        try {
            const city = req.body.cityInput;
            const cityName = city.charAt(0).toUpperCase() + city.slice(1);
            
            const weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${openweathermapAPI_KEY}`;
            const weatherResponse = await axios.get(weatherURL);
            const giphyResponse = await axios.get(`https://api.giphy.com/v1/gifs/translate?api_key=${giphyAPI_KEY}&s=${weatherResponse.data.weather[0].main}`);

            res.render('index', {weatherData: weatherResponse.data, giphyData: giphyResponse.data.data.images.original.url})
        } catch (error) {
            const giphyResponse = await axios.get(`https://api.giphy.com/v1/gifs/translate?api_key=${giphyAPI_KEY}&s=error`);
            res.render('index', {error: 'Ops! Try again!', errorImg: giphyResponse.data.data.images.original.url});
        }
    });


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App 🏃 on port ${PORT}...`);
});