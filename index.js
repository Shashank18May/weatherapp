const contain = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatBox = document.querySelector('.weather-box');
const weatDet = document.querySelector('.weather-details');
const error = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = 'f8254db689fed6b0eab940b56e2beca8';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                contain.style.height = '400px';
                weatBox.style.display = 'none';
                weatDet.style.display = 'none';
                error.style.display = 'block';
                error.classList.add('fadeIn');
                return;
            }

            error.style.display = 'none';
            error.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'clear.png';
                    break;

                case 'Rain':
                    image.src = 'rain.png';
                    break;

                case 'Snow':
                    image.src = 'snow.png';
                    break;

                case 'Clouds':
                    image.src = 'cloudy.png';
                    break;

                case 'Haze':
                    image.src = 'haze.png';
                    break;
                
                case 'Smoke':
                    image.src = 'haze.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatBox.style.display = '';
            weatDet.style.display = '';
            weatBox.classList.add('fadeIn');
            weatDet.classList.add('fadeIn');
            contain.style.height = '590px';


        });


});