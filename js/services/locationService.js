export const locationService = {
    gLocations
};

const API_KEY = 'AIzaSyAQAMCiYL5QhL2ZQBGzkxE1t7P2soWUT7Y';

var gLocations = []



function createLocation(ev) {
    const location = {
        id: '1242',
        name: 'Ezra Unehemiah Street',
        lat: 32.07504454902344,
        lng: 34.91474729404208,
        createdAt: Date.now(),
        updatedAt: ''
    }
    gLocations.push(location)
}


getLocationName(32.07504454902344,34.91474729404208)

function getLocationName(lat,lng) {
    const link = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
    fetch(link)
    .then((res) => res.json()).then(ans => console.log(ans.results[0].formatted_address))
}

