import { mapService } from './services/mapService.js';
import { locationService } from './services/locationService.js';

var gMap;

mapService.getLocs()
    .then(locs => console.log('locs', locs))

window.onload = () => {
    initMap()
        .then(() => {

            addMarker({ lat: 32.0749831, lng: 34.9120554 });
        })
        .catch(console.log('INIT MAP ERROR'));

    getPosition()
        .then(pos => {

            console.log('User position is:', pos.coords);
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

document.querySelector('.btn').addEventListener('click', (ev) => {
    console.log('Aha!', ev.target);
    panTo(35.6895, 139.6917);
})


export function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            // console.log('Map!', gMap);
            gMap.addListener('click',(ev) => {
                // console.log(ev);
                onCreateLocation(ev)
                .then(renderTable)
            })
        })
}



function onCreateLocation(ev) {
    return locationService.createLocation(ev)
}

function renderTable() {
    let locations =locationService.loadLocationsFromStorage();
    let strHtml = `<tr><th>id</th><th>name</th><th>createdAt</th></tr>`
    let strHtmls = locations.map((location) => {
        return `
        <tr>
            <td class="id">${location.id}</td>
            <td class="name">${location.name}</td>
            <td class="createdAt">${location.createdAt}</td>
        </tr>`
    })
    strHtml += strHtmls.join('');
    document.querySelector('.locations-table').innerHTML = strHtml
}


function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}

function getPosition() {
    console.log('Getting Pos');

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}




function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyAQAMCiYL5QhL2ZQBGzkxE1t7P2soWUT7Y';
    var elGoogleApi = document.createElement('script');
    // elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}



