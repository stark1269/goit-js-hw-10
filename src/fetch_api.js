const BASE_URL = 'https://restcountries.com/v3.1/name';

// export function fetchCountries(name) {
//   return fetch(`${BASE_URL}/${name}?fields=name,capital,population,flags,languages`).then(res => {
//     if (!res.ok) {
//       return [];
//     } return res.json();
//   }).catch(error => console.log(error));
// };

export async function fetchCountries(name) {
  const res = await fetch(`${BASE_URL}/${name}?fields=name,capital,population,flags,languages`);
    if (!res.ok) {
      return [];
    } return res.json();
};