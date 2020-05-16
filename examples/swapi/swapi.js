/**
 * Clientlib for a subset of data in https://swapi.dev/
 * @flow
 */

const url = require('url');
const fetch = require('node-fetch').default;
const SWAPI_URL = 'https://swapi.dev/api/';

export type SWAPI_Planet = $ReadOnly<{|
    name: string,
    rotation_period: string,
    orbital_period: string,
    diameter: string,
    climate: string,
    gravity: string,
    terrain: string,
    surface_water: string,
    population: string,
    residents: $ReadOnlyArray<string>,
    films: $ReadOnlyArray<string>,
    created: string,
    edited: string,
    url: string,
|}>;

export type SWAPI_Person = $ReadOnly<{|
    name: string,
    height: string,
    mass: string,
    hair_color: string,
    skin_color: string,
    eye_color: string,
    birth_year: string,
    gender: string,
    homeworld: string,
    films: $ReadOnlyArray<string>,
    species: $ReadOnlyArray<string>,
    vehicles: $ReadOnlyArray<string>,
    starships: $ReadOnlyArray<string>,
    created: string,
    edited: string,
    url: string,
|}>;

export type SWAPI_Vehicle = $ReadOnly<{|
    name: string,
    key: string,
|}>;
export type SWAPI_Species = $ReadOnly<{|
    name: string,
    key: string,
|}>;
export type SWAPI_Starship = $ReadOnly<{|
    name: string,
    key: string,
|}>;
export type SWAPI_Film = $ReadOnly<{|
    name: string,
    director: string,
    created: string,
    key: string,
|}>;

type SWAPI_Root = $ReadOnly<{|
    people: string,
    planets: string,
    films: string,
    species: string,
    vehicles: string,
    starships: string,
|}>;

export type SWAPIClientlibTypes = {|
    getPlanets: ({| planet_ids: $ReadOnlyArray<number> |}) => Promise<$ReadOnlyArray<SWAPI_Planet>>,
    getPeople: ({| people_ids: $ReadOnlyArray<number> |}) => Promise<$ReadOnlyArray<SWAPI_Person>>,
    getVehicles: ({| vehicle_ids: $ReadOnlyArray<number> |}) => Promise<$ReadOnlyArray<SWAPI_Vehicle>>,
    getSpecies: ({| species_ids: $ReadOnlyArray<number> |}) => Promise<$ReadOnlyArray<SWAPI_Species>>,
    getStarships: ({| starship_ids: $ReadOnlyArray<number> |}) => Promise<$ReadOnlyArray<SWAPI_Starship>>,
    getFilms: ({| film_ids: $ReadOnlyArray<number> |}) => Promise<$ReadOnlyArray<SWAPI_Film>>,
    getRoot: ({||}) => Promise<SWAPI_Root>,
|};

module.exports = function(): SWAPIClientlibTypes {
    return {
        getPlanets: ({ planet_ids }) =>
            Promise.all(planet_ids.map(id => fetch(url.resolve(SWAPI_URL, `planets/${id}`)).then(res => res.json()))),
        getPeople: ({ people_ids }) =>
            Promise.all(people_ids.map(id => fetch(url.resolve(SWAPI_URL, `people/${id}`)).then(res => res.json()))),
        getVehicles: ({ vehicle_ids }) =>
            Promise.all(vehicle_ids.map(id => fetch(url.resolve(SWAPI_URL, `vehicles/${id}`)).then(res => res.json()))),
        getSpecies: ({ species_ids }) =>
            Promise.all(species_ids.map(id => fetch(url.resolve(SWAPI_URL, `species/${id}`)).then(res => res.json()))),
        getStarships: ({ starship_ids }) =>
            Promise.all(starship_ids.map(id => fetch(url.resolve(SWAPI_URL, `starships/${id}`)).then(res => res.json()))),
        getFilms: ({ film_ids }) =>
            Promise.all(film_ids.map(id => fetch(url.resolve(SWAPI_URL, `films/${id}`)).then(res => res.json()))),
        getRoot: ({}) => fetch(SWAPI_URL).then(res => res.json()),
    };
};
