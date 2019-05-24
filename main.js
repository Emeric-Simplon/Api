const inputElt = document.querySelector('input');
const townName  = document.querySelector('h2');
const tempMin = document.getElementById('min');
const tempMax= document.getElementById('max');
const humidity= document.getElementById('hum');
const icone = document.getElementById('icone');
const time = document.getElementById('time');
const container = document.getElementById('cont');
const condition = document.getElementById('condition');
const place = document.getElementById('lieu');
const title = document.getElementById('articleTitle');
const author = document.getElementById('author');
const contenu = document.getElementById('contenu');
const source = document.getElementById('source');
const presse = document.getElementById('presse');

function getWeather(){
    getNews ()
    var getInsee = fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputElt.value}&lang=fr&units=metric&appid=d644faf5e723d2dafb0c29179a220c45`
        );  
      getInsee
        .then(function (response){
            container.style.opacity = 1;
            return response.json()
        }).then(function (data){
            (function () {
                function checkTime(i) {
                    return (i < 10) ? "0" + i : i;
                }
                function startTime() {
                    var today = new Date().getTime()+data.timezone*1000,
                        h = checkTime(new Date(today)),
                        z = h.toUTCString();
                    document.getElementById('time').innerHTML = z;
                    t = setTimeout(function () {
                        startTime()
                    }, 1000);
                }
                startTime();
            })();
            place.innerHTML = `Longitude: ${data.coord.lon}, Latitude : ${data.coord.lat}`;
            townName.innerHTML = inputElt.value.toUpperCase()         
            tempMin.innerHTML = `Min: ${parseInt(data.main.temp_min)}°`;
            tempMax.innerHTML = `Max: ${parseInt(data.main.temp_max)}°`;
            humidity.innerHTML =`${data.main.humidity}%`;
            if(data.weather[0].main == "Clouds"){
                if(data.weather[0].description == "broken clouds" && data.weather[0].description ==	"overcast clouds"){
                    icone.className ="fas fa-cloud";
                    condition.innerHTML = data.weather[0].description;
                }else{
                    icone.className ="fas fa-cloud-sun";
                    condition.innerHTML = data.weather[0].description;
             }
            }
            else if(data.weather[0].main == "Clear"){
            icone.className ="fas fa-sun";
            condition.innerHTML = data.weather[0].description;
            }else if(data.weather[0].main == "Rain"){
                icone.className ="fas fa-rain";
                condition.innerHTML = data.weather[0].description;
            }else if(data.weather[0].main == "Snow"){
                icone.className ="fas fa-snowflake";
                condition.innerHTML = data.weather[0].description;
            }else if(data.weather[0].main == "Drizzle"){
                icone.className ="fas fa-cloud-showers-heavy";
                condition.innerHTML = data.weather[0].description;
            }else if(data.weather[0].main == "Thunderstorm"){
                icone.className ="fas fa-bolt";
                condition.innerHTML = data.weather[0].description;
            }
        })};
        function getNews () {
            var news = fetch (
                `https://newsapi.org/v2/top-headlines?q=${inputElt.value}&apiKey=b1ddc2e2eec948f999b37e1e1c374ca4`);
                news
                .then(function (answer){
                    return answer.json()
                }).then(function(article) {
                    console.log(article)
                    if (article.articles.length > 0) {
                        presse.style.opacity = 1;
                    }
                    title.innerHTML = article.articles[0].title;
                    author.innerHTML = article.articles[0].author;
                    contenu.innerHTML = article.articles[0].content;
                    source.innerHTML = article.articles[0].source.name;
                })
        }
inputElt.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        getValue.click();
    }
    });
        
