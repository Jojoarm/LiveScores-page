window.addEventListener('load', () => {

    const games = document.querySelector('.container')
    const gameCount = document.querySelector('.count')

    fetch("https://api-football-beta.p.rapidapi.com/fixtures?date=2021-03-16", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "d6fe9dd75bmsh438583ac3b6ff62p1635e6jsn839cb134aa85",
            "x-rapidapi-host": "api-football-beta.p.rapidapi.com"
        }
    })
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data)
            console.log(data.response[0].teams.away.name)

            gameCount.innerText = data.response.length;
            games.innerHTML = ''
            for (let i=0; i<data.response.length; i++){
                //create a function to add extra zero to time format
                function addZero(i) {
                    if (i < 10) {
                      i = "0" + i;
                    }
                    return i;
                  }
                var d = new Date(`${data.response[i].fixture.date}`);
                var h = addZero(d.getHours());
                var m = addZero(d.getMinutes());
                let time = h + ":" + m
                let logo = data.response[i].league.logo
                let country = data.response[i].league.country
                let home_team = data.response[i].teams.home.name
                let away_team = data.response[i].teams.away.name
                let home_logo = data.response[i].teams.home.logo
                let away_logo = data.response[i].teams.away.logo
                let home_score
                if(data.response[i].goals.away == null){
                    home_score = ''
                } else {
                    home_score = data.response[i].goals.away
                }
                let away_score
                if (data.response[i].goals.away == null){
                    away_score = ''
                } else{
                    away_score = data.response[i].goals.away
                }
                
                games.innerHTML += `<div class="match">
                <div class="league">
                    <div class="flag"><img src="${logo}" alt="flag picture"></div>
                    <div class="name">${country}</div>
                </div>
                <div class="time">${time}</div>
                <div class="game">
                    <div class="home_team">${home_team} <img src="${home_logo}"></div>
                    <div class="score"><span class='home_score'>${home_score}</span>-<span class='away_score'>${away_score}</span></div>
                    <div class="away_team"><img src="${away_logo}"> ${away_team}</div>
                </div>
            </div>`
            }
        })
        .catch(err => {
            console.error(err);
        });
})

