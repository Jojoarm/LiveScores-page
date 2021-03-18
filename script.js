window.addEventListener('load', () => {
    // const matches = document.querySelector('.match_details')
    const games = document.querySelector('.container')
    const results = document.querySelector('.result-container')
    const gameCount = document.querySelector('.count')
    const leagueList = document.querySelector('.league_names')

    const d = new Date() // today, now
    //change the date gotten to YYYY-MM-DD format
    const date = d.toISOString().slice(0, 10)

    fetch(`https://api-football-beta.p.rapidapi.com/fixtures?date=${date}`, {
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

            let countryArr = []
            let leagueArr = []
            
            for (let i=0; i<data.response.length; i++){
                //Create an array of all the countries available
                if (!countryArr.includes(data.response[i].league.country)){
                    countryArr.push(data.response[i].league.country)
                }
                //Create an array of all the Leagues available
                if (!leagueArr.includes(data.response[i].league.name)){
                    leagueArr.push(data.response[i].league.name)
                }
            }
            
            gameCount.innerText = data.response.length;
            games.innerHTML = ''
            results.innerHTML = ''
            let filtered
            
            for (let i=0; i<data.response.length; i++){
                //Set display time for each match
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
                //if match is finished time should display FT
                if (data.response[i].fixture.status.short == 'FT'){
                    time = 'FT'
                }
                //if match is at halftime, the time should display HT
                else if (data.response[i].fixture.status.short == 'HT'){
                    time = 'HT'
                }
                //if match is postponed, the time should display Postp.
                else if (data.response[i].fixture.status.short == 'PST'){
                    time = 'Postp.'
                } else if (data.response[i].fixture.status.short == 'NS'){
                    time = time
                } 
                else if (data.response[i].fixture.status.short == 'CANC'){
                    time = 'Canc'
                } 
                else if (data.response[i].fixture.status.short == 'ET'){
                    time = 'ET'
                } 
                else if (data.response[i].fixture.status.short == 'P'){
                    time = 'Pen'
                } 
                else{
                    time = data.response[i].fixture.status.elapsed  
                }
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
                    home_score = data.response[i].goals.home
                }
                let away_score
                if (data.response[i].goals.away == null){
                    away_score = ''
                } else{
                    away_score = data.response[i].goals.away
                }
                if (data.response[i].fixture.status.long == 'Match Finished'|| 
                    data.response[i].fixture.status.short == 'PST' || 
                    data.response[i].fixture.status.short == 'CANC'
                    ){
                    results.innerHTML += `<div class="match-end">
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
                else{
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

                
            }
        })
        .catch(err => {
            console.error(err);
        });
})
