export const locationService = {
    gLocations,
    createLocation,
};

import { storageService } from './storageService.js';

const API_KEY = 'AIzaSyAQAMCiYL5QhL2ZQBGzkxE1t7P2soWUT7Y';

var gLocations = [];

function getLocations() {
   return storegeService.loadFromStorage('locationsDB')
}


function createLocation(ev) {
    const location = {
        id: '1242',
        // name: getLocationName(ev.latLng.lat(),ev.latLng.lng()),
        name: 'some name',
        lat: ev.latLng.lat(),
        lng: ev.latLng.lng(),
        createdAt: Date.now(),
        updatedAt: ''
    }
<<<<<<< HEAD
        gLocations.push(location)
        console.log(gLocations);
=======
    gLocations.push(location)

>>>>>>> 2f97c5d9160d299e1461ba257764708618efdc51
}



<<<<<<< HEAD
// getLocationName(32.07504454902344,34.91474729404208)
=======

getLocationName(32.07504454902344, 34.91474729404208)
>>>>>>> 2f97c5d9160d299e1461ba257764708618efdc51

function getLocationName(lat, lng) {
    const link = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
<<<<<<< HEAD
    return fetch(link)
    .then((res) => res.json())
    .then(ans => ans.results[0].formatted_address)
=======
    fetch(link)
        .then((res) => res.json()).then(ans => console.log(ans.results[0].formatted_address))
}

function saveLocationsToStorage() {
    storageService.saveToStorage('locationsDB', gLocations);
>>>>>>> 2f97c5d9160d299e1461ba257764708618efdc51
}

function loadLocationsFromStorage() {
    return storageService.loadFromStorage('locationsDB');
}