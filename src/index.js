import './css/styles.css';
import { fetchCountries } from './fetch_api';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

// function onInputSearch() {
//   const inputValue = input.value.trim();

//   if (!inputValue) {
//     clearHtml();
//     return
//   }
//   fetchCountries(inputValue).then(data => {
//     if (data.length > 10) {
//       clearHtml();
//       Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
//     } else if (data.length >= 2 && data.length <= 10) {
//       clearHtml();
//       createListCount(data);
//     } else if (data.length === 0) {
//       clearHtml();
//       Notiflix.Notify.failure("Oops, there is no country with that name");
//     } else if (data.length === 1) {
//       clearHtml();
//       createInfoCount(data);
//     };
//   }).catch(error => console.log(error));
// };

async function onInputSearch() {
  const inputValue = input.value.trim();

  if (!inputValue) {
    clearHtml();
    return
  };

  try {
    const data = await fetchCountries(inputValue);
    if (data.length > 10) {
      clearHtml();
      Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    } else if (data.length >= 2 && data.length <= 10) {
      clearHtml();
      createListCount(data);
    } else if (data.length === 0) {
      clearHtml();
      Notiflix.Notify.failure("Oops, there is no country with that name");
    } else if (data.length === 1) {
      clearHtml();
      createInfoCount(data);
    };
  } catch (error) {
    console.log(error)
  };
};

function createListCount(countries) {
  const countryList = countries.map(country => `<li class="country-list-item">
  <img class="country-list-img" src="${country.flags.svg}" alt="${country.name.common}">
  <h2>${country.name.common}</h2>
  </li>`).join('');

  list.innerHTML = countryList;
};

function createInfoCount(countries) {
  const countryInfo = countries.map(country => `<div class="country-info-wrapper">
  <img class="country-info-img" src="${country.flags.svg}" alt="${country.name.common}">
  <h2 class="country-info-title">${country.name.common}</h2>
  </div>
  <div class="info-wrap">
  <p class="country-info-text"><b>Capital: </b>${country.capital}</p>
  <p class="country-info-text"><b>Population: </b>${country.population}</p>
  <p class="country-info-text"><b>Languages: </b>${Object.values(country.languages).join(', ')}</p>
  </div>`).join('');

  info.innerHTML = countryInfo;
};

function clearHtml() {
  list.innerHTML = ''
  info.innerHTML = ''
};

input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));