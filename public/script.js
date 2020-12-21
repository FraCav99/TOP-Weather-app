const switchTemp = document.getElementById('switchTemp');
const gradeMeasure = document.getElementById('degrees');
const temperature = document.getElementById('temperature');
const feelsLike = document.getElementById('feels-like');
const feelsLikeDegree = document.getElementById('feels-like-degree');

switchTemp.checked = false;
const previousDegreeCelsius = temperature.textContent;
const previousFeelsLikeDegree = feelsLike.textContent;

const createDegressSymbol = (gradeStr) => {
    const gradeMeasure = document.createElement('small');
    gradeMeasure.setAttribute('id', 'degrees');
    gradeMeasure.textContent = gradeStr;
    temperature.appendChild(gradeMeasure);

    const feelsLikeMesure = document.createElement('small');
    feelsLikeMesure.setAttribute('id', 'feels-like-degree');
    feelsLikeMesure.textContent = gradeStr;
    feelsLike.appendChild(feelsLikeMesure);
}

switchTemp.addEventListener('change', () => {
    if (switchTemp.checked) {
        let celsiusTemp = +temperature.textContent.slice(0, -2);
        let celsiusFeelsTemp = +feelsLike.textContent.slice(0, -2);

        let fahrenheitTemp = (celsiusTemp * (9 / 5)) + 32;
        let fahrenheitFeelsTemp = (celsiusFeelsTemp * (9 / 5)) + 32;

        temperature.textContent = `${fahrenheitTemp.toFixed(1)}`;
        feelsLike.textContent = `${fahrenheitFeelsTemp.toFixed(1)}`;
        createDegressSymbol('°F');
    } else {
        temperature.textContent = previousDegreeCelsius.slice(0, -2);
        feelsLike.textContent = previousFeelsLikeDegree.slice(0, -2);
        createDegressSymbol('°C');
    }
})