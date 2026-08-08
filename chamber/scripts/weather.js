const apiKey = "6d4bb9caa6f7eb96a5276c1485e0507d";


const url =
    `https://api.openweathermap.org/data/2.5/forecast?q=Abidjan&units=metric&appid=6d4bb9caa6f7eb96a5276c1485e0507d`;



async function getWeather() {


    try {


        const response = await fetch(url);

        const data = await response.json();



        document.querySelector("#temperature")
            .textContent =
            `${data.list[0].main.temp}°C`;



        document.querySelector("#description")
            .textContent =
            data.list[0].weather[0].description;



        displayForecast(data);


    }

    catch (error) {

        console.log(error);

    }


}





function displayForecast(data) {


    const forecast =
        document.querySelector("#forecast");


    const days = data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
    );



    days.slice(0, 3).forEach(day => {


        forecast.innerHTML += `

<div class="forecast-card">

<p>
${new Date(day.dt_txt)
                .toLocaleDateString()}
</p>

<strong>
${day.main.temp}°C
</strong>

<p>
${day.weather[0].description}
</p>


</div>

`;

    });


}



getWeather();