export const locationService = {
    gLocations,
    createLocation,
    loadLocationsFromStorage,
    selectedLocation
};

import { storageService } from './storageService.js';

const API_KEY = 'AIzaSyAQAMCiYL5QhL2ZQBGzkxE1t7P2soWUT7Y';

var gLocations = [];




// function createLocation(name) {
//     const location = {
//         id: '1242',
//         name: name,
//         lat: 0.5,
//         lng: 0.5,
//         createdAt: Date.now(),
//         updatedAt: ''
//     }
//         // gLocations.push(location)
//         // saveLocationsToStorage()
//         console.log(location);
// }



// getLocationName(32.07504454902344,34.91474729404208)

function getLocationName(lat, lng) {
    const link = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
    return fetch(link)
        .then((res) => res.json())
        .then(ans => ans.results[0].formatted_address)
}


function loadLocationsFromStorage() {
    return storageService.loadFromStorage('locationsDB');
}

function saveLocationsToStorage() {
    storageService.saveToStorage('locationsDB', gLocations);

}

function selectedLocation(ev) {
    const locationPrm = new Promise((resolve) => {
            resolve(getLocationName(ev.latLng.lat(), ev.latLng.lng()));
        })
        return locationPrm
        // getLocationName(ev.latLng.lat(), ev.latLng.lng())
        //     .then(create)
}