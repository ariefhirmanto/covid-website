// Get Data from API
let url = "https://covid19.mathdro.id/api/confirmed";
let proxyUrl = "https://fierce-fortress-83266.herokuapp.com/";
let listOfCountry = ["US", "Spain", "Italy", "France", "Russia", "Germany", "United Kingdom", "Brazil", "Turkey", "Iran", "Indonesia"];
let objData = {};
let dataUS = {
    confirmed: 0,
    death: 0,
    recovered: 0
};
let dataFR = {
    confirmed: 0,
    death: 0,
    recovered: 0,   
}
let dataUK = {
    confirmed: 0,
    death: 0,
    recovered: 0
}

fetch(proxyUrl + url, { mode: 'cors'})
    .then(res => res.json())
    .then(data => {
        console.log(data);
        for (country in data) {
            if (data[country].countryRegion === 'US') {
                dataUS.confirmed += data[country].confirmed;
                dataUS.death += data[country].deaths;
                dataUS.recovered += data[country].recovered;
            } else if (data[country].countryRegion === 'United Kingdom') {
                dataUK.confirmed += data[country].confirmed;
                dataUK.death += data[country].deaths;
                dataUK.recovered += data[country].recovered;
            } else if (data[country].countryRegion === 'France') {
                dataFR.confirmed += data[country].confirmed;
                dataFR.death += data[country].deaths;
                dataFR.recovered += data[country].recovered;
            } else if (listOfCountry.includes(data[country].countryRegion)) {
                let listData = {
                    confirmed: data[country].confirmed,
                    death: data[country].deaths,
                    recovered: data[country].recovered
                }
                objData[data[country].countryRegion] = listData;
            } 
            objData['US'] = dataUS;
            objData['France'] = dataFR;
            objData['United Kingdom'] = dataUK;
        }
        updateDisplayCountry();
        updateDisplayIndonesia();
    }).catch(err => {
        console.error('Error: ', err);
    });

function updateDisplayIndonesia() {
    document.querySelector("#indonesia-positive").innerText = objData.Indonesia.confirmed;
    document.querySelector("#indonesia-cured").innerText = objData.Indonesia.recovered;
    document.querySelector("#indonesia-death").innerText = objData.Indonesia.death;
}

function updateDisplayCountry() {
    let covidList = document.querySelector("#covidList");
    covidList.innerHTML = "";
    for (country of listOfCountry) {
        let row = document.createElement('tr');
        row.innerHTML = "<td>" + country + "</td>";
        row.innerHTML += "<td>" + objData[country].confirmed + "</td>";
        row.innerHTML += "<td>" + objData[country].recovered + "</td>";
        row.innerHTML += "<td>" + objData[country].death + "</td>";
        covidList.appendChild(row);
    }   
}
