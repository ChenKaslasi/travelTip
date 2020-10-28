export const locationService = {
    gLocations,
    createLocation,
    loadLocationsFromStorage,
};

import { storageService } from './storageService.js';

const API_KEY = 'AIzaSyAQAMCiYL5QhL2ZQBGzkxE1t7P2soWUT7Y';

var gLocations = [];


function createLocation(ev) {
    return new Promise((resolve) => {
        getLocationName(ev.latLng.lat(), ev.latLng.lng())
        .then(ans => {
            const location = {
                id: '1242',
                name: ans,
                lat: ev.latLng.lat(),
                lng: ev.latLng.lng(),
                createdAt: Date.now(),
                updatedAt: ''
            }
            console.log(location);
            gLocations.push(location)
            saveLocationsToStorage()
            resolve(location)
        })
    }) 
}



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