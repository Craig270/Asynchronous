'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const getCountryData = function (country) {
  //Trying old way of doing things
  const request = new XMLHttpRequest();
  request.open(
    'GET',
    `https://restcountries.eu/rest/v2/name/${country}?fullText=true`
  );
  request.send();
  console.log(request.responseText);
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = ` 
  <article class="country">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
        </div>
    </article>
  
  `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};
// getCountryData('mexico');
// getCountryData('germany');
// getCountryData('usa');

const renderCountry = function (data, className = '') {
  const html = ` 
    <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
              <h3 class="country__name">${data.name}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(
                +data.population / 1000000
              ).toFixed(1)} million people</p>
              <p class="country__row"><span>🗣️</span>${
                data.languages[0].name
              }</p>
              <p class="country__row"><span>💰</span>${
                data.currencies[0].name
              }</p>
          </div>
      </article>
    
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
const getCountryAndNeighbor = function (country) {
  //old way of doing things
  const request = new XMLHttpRequest();
  request.open(
    'GET',
    `https://restcountries.eu/rest/v2/name/${country}?fullText=true`
  );
  request.send();
  console.log(request.responseText);
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    //Get neighbor country
    renderCountry(data);
    //Get neighbor
    const [neighbor] = data.borders;
    if (!neighbor) return;
    //AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbor}`);
    request2.send();
    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      renderCountry(data2, `neighbor`);
    });
  });
};

// getCountryAndNeighbor('portugal');
// getCountryAndNeighbor('usa');
/*
const request = new XMLHttpRequest();
request.open(
  'GET',
  `https://restcountries.eu/rest/v2/name/${country}?fullText=true`
);
request.send();
*/
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};
const requestFetch = fetch(
  `https://restcountries.eu/rest/v2/name/usa?fullText=true`
);
// console.log(requestFetch);
const getJSON = function (url) {
  fetch(url).then(response => {
    if (!response.ok) throw new Error(`Country not found ${response.status}`);

    return response.json();
  });
};

const getCountryDataFetch = function (country) {
  fetch(`https://restcountries.eu/rest/v2/name/${country}?fullText=true`)
    .then(response => {
      if (!response.ok) throw new Error(`Country not found ${response.status}`);

      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      const neighbor = data[0].borders[0];
      if (!neighbor) return;
      //Neighbor Country

      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbor}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbor'))
    .catch(err => {
      renderError(`Something went wrong 🧨🧨🧨 ${err}`);
      console.error(`${err}--Wrong info entered🧨🧨🧨`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
btn.addEventListener('click', function () {
  getCountryDataFetch('mexico');
});
getCountryDataFetch(`usa`);
// getCountryDataFetch('ksdnjfsknf');

//Building a Simple Promise

const lotteryPromise = new Promise(function (resolve, reject) {
  if (Math.random() >= 0.5) {
    resolve(`You win`);
  } else {
    reject(`You lost`);
  }
});

lotteryPromise.then((res = console.log(res)).catch(err => console.log(err)));
