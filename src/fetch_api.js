const BASE_URL = 'https://restcountries.com/v3.1/name';

export function fetchCountries(name) {
  return fetch(`${BASE_URL}/${name}?fields=name,capital,population,flags,languages`).then(res => {
    if (!res.ok) {
      return [];
    } return res.json();
  }).catch(error => console.log(error));
};