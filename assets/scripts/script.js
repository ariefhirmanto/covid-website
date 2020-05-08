// Get Data from API
let url = "https://covid19.mathdro.id/api/confirmed";
let proxyUrl = "https://fierce-fortress-83266.herokuapp.com/";
let listOfCountry = ["US", "Spain", "Italy", "United Kingdom", "Russia", "France", "Germany", "Brazil", "Turkey", "Iran", "Indonesia"];
let objData = {};

fetch(proxyUrl + url, { mode: 'cors'})
    .then(res => res.json())
    .then(data => {
        console.log(data);
        for (country in data) {
            if (listOfCountry.includes(data[country].countryRegion)) {
                let listData = {
                    confirmed: data[country].confirmed,
                    death: data[country].deaths,
                    recovered: data[country].recovered
                }
                objData[data[country].countryRegion] = listData;
            }
            updateDisplayCountry(objData[data[country].countryRegion]);
        }
        updateDisplayIndonesia();
    }).catch(err => {
        console.error('Error: ', err);
    });

function updateDisplayIndonesia() {
    document.querySelector("#indonesia-positive").innerText = objData.Indonesia.confirmed;
    document.querySelector("#indonesia-cured").innerText = objData.Indonesia.recovered;
    document.querySelector("#indonesia-death").innerText = objData.Indonesia.death;
}

function updateDisplayCountry(countries) {
    let covidList = document.querySelector("#covidList");
    covidList.innerHTML = "";
    for (country in )
    let row = document.createElement('tr');
    row.innerHTML = "<td>" + country + "</td>";
    row.innerHTML += "<td>" + country.confirmed + "</td>";
    row.innerHTML += "<td>" + country.recovered + "</td>";
    row.innerHTML += "<td>" + country.death + "</td>";
    covidList.appendChild(row);   
}
