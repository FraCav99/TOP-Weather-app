const switchTemp = document.getElementById('switchTemp');
const gradeMeasure = document.getElementById('degrees');
const temperature = document.getElementById('temperature');

const previousDegreeCelsius = temperature.textContent;
const createDegressSymbol = (gradeStr) => {
    const gradeMeasure = document.createElement('small');
    gradeMeasure.setAttribute('id', 'degrees');
    gradeMeasure.textContent = gradeStr;
    temperature.appendChild(gradeMeasure);
}

switchTemp.addEventListener('change', () => {
    if (switchTemp.checked) {
        let celsiusTemp = +temperature.textContent.slice(0, -2);
        let fahrenheitTemp = (celsiusTemp * (9 / 5)) + 32;
        temperature.textContent = `${fahrenheitTemp.toFixed(1)}`;
        createDegressSymbol('°F');
    } else {
        temperature.textContent = previousDegreeCelsius.slice(0, -2);
        createDegressSymbol('°C');
    }
})