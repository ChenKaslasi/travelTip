export const locationService = {
    gLocations,
    createLocation,
};

const API_KEY = 'AIzaSyAQAMCiYL5QhL2ZQBGzkxE1t7P2soWUT7Y';

var gLocations = []

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
        gLocations.push(location)
        console.log(gLocations);
}



// getLocationName(32.07504454902344,34.91474729404208)

function getLocationName(lat,lng) {
    const link = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
    return fetch(link)
    .then((res) => res.json())
    .then(ans => ans.results[0].formatted_address)
}

