const mapStyle = [{
  'featureType': 'administrative',
  'elementType': 'all',
  'stylers': [{
    'visibility': 'on',
  },
  {
    'lightness': 33,
  },
  ],
},
{
  'featureType': 'landscape',
  'elementType': 'all',
  'stylers': [{
    'color': '#f2e5d4',
  }],
},
{
  'featureType': 'poi.park',
  'elementType': 'geometry',
  'stylers': [{
    'color': '#c5dac6',
  }],
},
{
  'featureType': 'poi.park',
  'elementType': 'labels',
  'stylers': [{
    'visibility': 'on',
  },
  {
    'lightness': 20,
  },
  ],
},
{
  'featureType': 'road',
  'elementType': 'all',
  'stylers': [{
    'lightness': 20,
  }],
},
{
  'featureType': 'road.highway',
  'elementType': 'geometry',
  'stylers': [{
    'color': '#c5c6c6',
  }],
},
{
  'featureType': 'road.arterial',
  'elementType': 'geometry',
  'stylers': [{
    'color': '#e4d7c6',
  }],
},
{
  'featureType': 'road.local',
  'elementType': 'geometry',
  'stylers': [{
    'color': '#fbfaf7',
  }],
},
{
  'featureType': 'water',
  'elementType': 'all',
  'stylers': [{
    'visibility': 'on',
  },
  {
    'color': '#acbcc9',
  },
  ],
},
];

let map;
let places;
let autocomplete;
const countryRestrict = { country: "mx" };
const hostnameRegexp = new RegExp("^https?://.+?/");
const countries = {
  mx: {
    center: { lat: 19.3906797, lng: -99.1789844 },
    zoom: 11,
  },
  bt: {
    center: { lat: 24.4229284, lng: -78.2105668 },
    zoom: 7,
  },
  bb: {
    center: { lat: 13.1884729, lng: -59.6753409 },
    zoom: 11,
  },
  bz: {
    center: { lat: 17.5913094, lng: -88.5680437 },
    zoom: 9,
  },
  bm: {
    center: { lat: 32.3194245, lng: -64.83644 },
    zoom: 12,
  },
  cr: {
    center: { lat: 9.8214687, lng: -84.0372879 },
    zoom: 8,
  },
  cw: {
    center: { lat: 12.1893658, lng: -68.9838536 },
    zoom: 11,
  },
  vir: {
    center: { lat: 18.334457, lng: -64.9515766 },
    zoom: 6,
  },
  gt: {
    center: { lat: 15.1182348, lng: -90.7487039 },
    zoom: 8,
  },
  hn: {
    center: { lat: 15.5198896, lng: -88.0557015 },
    zoom: 8,
  },
  jm: {
    center: { lat: 18.1198251, lng: -77.8379578 },
    zoom: 8,
  },
  ni: {
    center: { lat: 12.8691927, lng: -86.1389857 },
    zoom: 8,
  },
  pa: {
    center: { lat: 8.3788373, lng: -81.2266612 },
    zoom: 7,
  },
  do: {
    center: { lat: 18.6691757, lng: -71.2513174 },
    zoom: 8,
  },
  lc: {
    center: { lat: 13.9131461, lng: -61.1106016 },
    zoom: 10,
  },
  sr: {
    center: { lat: 3.9854341, lng: -57.1280042 },
    zoom: 7,
  },
  tt: {
    center: { lat: 10.6975499, lng: -61.7721662 },
    zoom: 9,
  },
};


function initMap() {
map = new google.maps.Map(document.getElementById("map"), {
    //zoom: 7,
    //center: {lat: 52.632469, lng: -1.689423},
    zoom: countries["mx"].zoom,
    center: countries["mx"].center,
    mapTypeControl: false,

    //center: { lat: 20.1242363, lng: -98.7502409 },
    //"coordinates": [20.1242363,-98.7502409]
    //styles: mapStyle,
  });
const infoWindow = new google.maps.InfoWindow();
  
  mostrarSucursales(19.3906797, -99.1789844);

  // Create the map.

  // Load the stores GeoJSON onto the map.
  //map.data.loadGeoJson('js/sucursales-usg.json', {idPropertyName: 'storeid'});
  map.data.loadGeoJson('js/sucursales-usg-thd-1.json', {idPropertyName: 'storeid'});
  // Define the custom marker icons, using the store's "category".
  map.data.setStyle((feature) => {
    return {
      icon: {
        //url: `img/icon_${feature.getProperty('category')}.png`,
        url: 'img/icono_ubicacion-thd.png',
        scaledSize: new google.maps.Size(30, 29),
      },
    };
  });
  const apiKey = 'AIzaSyAlCQwGWkDu5MY1QoqwAHi3diQbPNhKkfU';
  
  // Show the information for a store when its marker is clicked.
  map.data.addListener('click', (event) => {
    const category = event.feature.getProperty('category');
    const name = event.feature.getProperty('name');
    const distribuidor = event.feature.getProperty('distribuidor');
    const direccion = event.feature.getProperty('direccion');
    const description = event.feature.getProperty('description');
    const hours = event.feature.getProperty('hours');
    const phone = event.feature.getProperty('phone');
    const codigopos = event.feature.getProperty('cp');
    const idsucursal = event.feature.getProperty('storeid');
    const position = event.feature.getGeometry().get();
    
    //const position = getLatLngByZipcode(direccion, lati, long);
    const content = '<img src="img/icon_usg.png" class="img-iconMapa d-none d-md-block"><div class="txt-Mapa"><h5>'+distribuidor+'</h5><p>'+name+'<br>'+direccion+'<br/><b>Municipio:</b> '+codigopos+'<br/><b>Horario:</b> '+hours+'<br/><b>Teléfono:</b> <a href="tel:'+phone+'">'+phone+'</a></p></div>';
    resaltarSucursales(position.lat(), position.lng(), idsucursal);
    setTimeout(function () {
        var element = document.getElementById(idsucursal);
        element.scrollIntoView(true);
        var btn_alert = document.getElementById('btn_'+idsucursal);
        btn_alert.onclick = function(e){
          //alert("Hola");
        }
    }, 500);
    infoWindow.setContent(content);
    infoWindow.setPosition(position);
    infoWindow.setOptions({pixelOffset: new google.maps.Size(0, -30)});
    infoWindow.open(map);
    console.log(position);
  });


  //#######
  // Create the autocomplete object and associate it with the UI input control.
  // Restrict the search to the default country, and to place type "cities".
  
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("autocomplete"),
    {
      types: ["(cities)"],
      componentRestrictions: countryRestrict,
    }
  );
  places = new google.maps.places.PlacesService(map);
  autocomplete.addListener("place_changed", onPlaceChanged);
  // Add a DOM event listener to react when the user selects a country.
  document.getElementById("country").addEventListener("change", setAutocompleteCountry);
    
  //######
  $(document).ready(function() {
      var btn_aceptarUbicacion = document.getElementById("btn_aceptarUbicacion");
      //var nombre_datos = document.getElementById("nombre_datos");
      btn_aceptarUbicacion.onclick = function(e){
        //var valor_nombre_datos = $(nombre_datos).val();
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };

              //infoWindow.setPosition(pos);
              //infoWindow.setContent("Location found.");
              //infoWindow.open(map);
              map.setCenter(pos);
              map.setZoom(10);
              //document.getElementById("listalugares").innerHTML = position.coords.latitude+', '+position.coords.longitude;
              mostrarSucursales(position.coords.latitude, position.coords.longitude);
            },
            () => {
              //handleLocationError(true, infoWindow, map.getCenter());
            }
          );
        } else {
          // Browser doesn't support Geolocation
          //handleLocationError(false, infoWindow, map.getCenter());
        }
      }

  });

}

function mostrarenMapa(sucursal, lati, longi, name, description, direccion, codigopos, hours, phone, distribuidor) {
  map = new google.maps.Map(document.getElementById("map"), {
    //zoom: 7,
    //center: {lat: 52.632469, lng: -1.689423},
    zoom: countries["mx"].zoom,
    center: countries["mx"].center,
    mapTypeControl: false,

    //center: { lat: 20.1242363, lng: -98.7502409 },
    //"coordinates": [20.1242363,-98.7502409]
    //styles: mapStyle,
  });

  const infoWindow = new google.maps.InfoWindow();

  map.data.loadGeoJson('js/sucursales-usg-thd-1.json', {idPropertyName: 'storeid'});
  // Define the custom marker icons, using the store's "category".
  map.data.setStyle((feature) => {
    return {
      icon: {
        //url: `img/icon_${feature.getProperty('category')}.png`,
        url: 'img/icono_ubicacion-thd.png',
        scaledSize: new google.maps.Size(30, 29),
      },
    };
  });

    map.data.addListener('click', (event) => {
    const category = event.feature.getProperty('category');
    const name = event.feature.getProperty('name');
    const distribuidor = event.feature.getProperty('distribuidor');
    const direccion = event.feature.getProperty('direccion');
    const description = event.feature.getProperty('description');
    const hours = event.feature.getProperty('hours');
    const phone = event.feature.getProperty('phone');
    const codigopos = event.feature.getProperty('cp');
    const idsucursal = event.feature.getProperty('storeid');
    const position = event.feature.getGeometry().get();
    //const position = getLatLngByZipcode(direccion, lati, long);
    const content = '<img src="img/icon_usg.png" class="img-iconMapa d-none d-md-block"><div class="txt-Mapa"><h5>'+distribuidor+'</h5><p>'+name+'<br>'+direccion+'<br/><b>Municipio:</b> '+codigopos+'<br/><b>Horario:</b> '+hours+'<br/><b>Teléfono:</b> <a href="tel:'+phone+'">'+phone+'</a></p></div>';

    resaltarSucursales(position.lat(), position.lng(), idsucursal);
    setTimeout(function () {
        var element = document.getElementById(idsucursal);
        element.scrollIntoView(true);
    }, 500);
    infoWindow.setContent(content);
    infoWindow.setPosition(position);
    infoWindow.setOptions({pixelOffset: new google.maps.Size(0, -30)});
    infoWindow.open(map);
  });

            var pos = {
                lat: lati,
                lng: longi,
              };
              //alert("Hola ");
              /////##
              var textoContenido = '<img src="img/icon_usg.png" class="img-iconMapa d-none d-md-block"><div class="txt-Mapa"><h5>'+distribuidor+'</h5><p>'+name+'<br>'+direccion+'<br/><b>Municipio:</b> '+codigopos+'<br/><b>Horario:</b> '+hours+'<br/><b>Teléfono:</b> <a href="tel:'+phone+'">'+phone+'</a></p></div>';
              
              infoWindow.setContent(textoContenido);
              //infoWindow.setPosition(position);
              infoWindow.setPosition(pos);
              infoWindow.setOptions({pixelOffset: new google.maps.Size(0, -30)});
              infoWindow.open(map);

              setTimeout(function () {
                var element = document.getElementById(sucursal);
                element.scrollIntoView(true);
            }, 500);

              resaltarSucursales(pos.lat, pos.lng, sucursal);


    autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      {
        types: ["(cities)"],
        componentRestrictions: countryRestrict,
      }
    );
    places = new google.maps.places.PlacesService(map);
  autocomplete.addListener("place_changed", onPlaceChanged);
  // Add a DOM event listener to react when the user selects a country.
  document.getElementById("country").addEventListener("change", setAutocompleteCountry);
    
  //######
  $(document).ready(function() {
        var btn_aceptarUbicacion = document.getElementById("btn_aceptarUbicacion");
        //var nombre_datos = document.getElementById("nombre_datos");
        btn_aceptarUbicacion.onclick = function(e){
          //var valor_nombre_datos = $(nombre_datos).val();
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                };

                //infoWindow.setPosition(pos);
                //infoWindow.setContent("Location found.");
                //infoWindow.open(map);
                map.setCenter(pos);
                map.setZoom(10);
                //document.getElementById("listalugares").innerHTML = position.coords.latitude+', '+position.coords.longitude;
                mostrarSucursales(position.coords.latitude, position.coords.longitude);
              },
              () => {
                //handleLocationError(true, infoWindow, map.getCenter());
              }
            );
          } else {
            // Browser doesn't support Geolocation
            //handleLocationError(false, infoWindow, map.getCenter());
          }
        }

    });

}

function mostrarSucursales(datolat, datolong) {

  var latitud = datolat;
  var longitud = datolong;
  // GET FORM INPUT
  var data_Sucursales = new FormData();
  data_Sucursales.append("latitud", latitud);
  data_Sucursales.append("longitud", longitud);
  // AJAX
  var xhr_dataSucursales = new XMLHttpRequest();
  xhr_dataSucursales.open("POST", "js/get_sucursalesthd.php", true);
  xhr_dataSucursales.onload = function () {
    if (this.status == 200) {
      var res_listaSucursales = JSON.parse(this.response);
      if (res_listaSucursales.status == true) {
        setTimeout(function () {
          document.getElementById("listalugares").innerHTML = res_listaSucursales["listaSucursales"];

          //alert("VALOR Municipio: " + valMunicipio );
        }, 200);
      } else {
        alert("ERROR DE CARGA DE DATOS");
      }
    } else {
      alert("ERROR AL CARGAR ARCHIVO PHP, VALOR " + latitud );
    }
  };
  xhr_dataSucursales.send(data_Sucursales);

}

function mostrarSucursalespais(pais) {

  var codigoiso = pais;
  // GET FORM INPUT
  var data_porpais = new FormData();
  data_porpais.append("codigoiso", codigoiso);
  // AJAX
  var xhr_dataporpais = new XMLHttpRequest();
  xhr_dataporpais.open("POST", "js/get_sucursalesporpaisthd.php", true);
  xhr_dataporpais.onload = function () {
    if (this.status == 200) {
      var res_listaporpais = JSON.parse(this.response);
      if (res_listaporpais.status == true) {
        setTimeout(function () {
          document.getElementById("listalugares").innerHTML = res_listaporpais["listaSucursales"];
          //alert("VALOR Municipio: " + valMunicipio );
        }, 200);
      } else {
        alert("ERROR DE CARGA DE DATOS");
      }
    } else {
      alert("ERROR AL CARGAR ARCHIVO PHP, VALOR " + latitud );
    }
  };
  xhr_dataporpais.send(data_porpais);

}

function resaltarSucursales(datolat, datolong, idsucursal) {

  var latitud = datolat;
  var longitud = datolong;
  // GET FORM INPUT
  var data_Sucursales = new FormData();
  data_Sucursales.append("latitud", latitud);
  data_Sucursales.append("longitud", longitud);
  data_Sucursales.append("idsucursal", idsucursal);
  // AJAX
  var xhr_dataSucursales = new XMLHttpRequest();
  xhr_dataSucursales.open("POST", "js/get_resaltarsucursalesthd.php", true);
  xhr_dataSucursales.onload = function () {
    if (this.status == 200) {
      var res_listaSucursales = JSON.parse(this.response);
      if (res_listaSucursales.status == true) {
          document.getElementById("listalugares").innerHTML = res_listaSucursales["listaSucursales"];
          //alert("VALOR Municipio: " + valMunicipio );
      } else {
        alert("ERROR DE CARGA DE DATOS");
      }
    } else {
      alert("ERROR AL CARGAR ARCHIVO PHP, VALOR " + latitud );
    }
  };
  xhr_dataSucursales.send(data_Sucursales);

}

async function calculateDistances(data, origin) {
  const stores = [];
  const destinations = [];

  // Build parallel arrays for the store IDs and destinations
  data.forEach((store) => {
    const storeNum = store.getProperty('storeid');
    const storeLoc = store.getGeometry().get();

    stores.push(storeNum);
    destinations.push(storeLoc);
  });

  // Retrieve the distances of each store from the origin
  // The returned list will be in the same order as the destinations list
  const service = new google.maps.DistanceMatrixService();
  const getDistanceMatrix =
    (service, parameters) => new Promise((resolve, reject) => {
      service.getDistanceMatrix(parameters, (response, status) => {
        if (status != google.maps.DistanceMatrixStatus.OK) {
          reject(response);
        } else {
          const distances = [];
          const results = response.rows[0].elements;
          for (let j = 0; j < results.length; j++) {
            const element = results[j];
            const distanceText = element.distance.text;
            const distanceVal = element.distance.value;
            const distanceObject = {
              storeid: stores[j],
              distanceText: distanceText,
              distanceVal: distanceVal,
            };
            distances.push(distanceObject);
          }

          resolve(distances);
        }
      });
    });

  const distancesList = await getDistanceMatrix(service, {
    origins: [origin],
    destinations: destinations,
    travelMode: 'DRIVING',
    unitSystem: google.maps.UnitSystem.METRIC,
  });

  distancesList.sort((first, second) => {
    return first.distanceVal - second.distanceVal;
  });

  return distancesList;
}

function showStoresList(data, stores) {
  if (stores.length == 0) {
    console.log('empty stores');
    return;
  }

  let panel = document.createElement('div');
  // If the panel already exists, use it. Else, create it and add to the page.
  if (document.getElementById('panel')) {
    panel = document.getElementById('panel');
    // If panel is already open, close it
    if (panel.classList.contains('open')) {
      panel.classList.remove('open');
    }
  } else {
    panel.setAttribute('id', 'panel');
    const body = document.body;
    body.insertBefore(panel, body.childNodes[0]);
  }

  // Clear the previous details
  while (panel.lastChild) {
    panel.removeChild(panel.lastChild);
  }

  stores.forEach((store) => {
    // Add store details with text formatting
    const name = document.createElement('p');
    name.classList.add('place');
    const currentStore = data.getFeatureById(store.storeid);
    name.textContent = currentStore.getProperty('name');
    panel.appendChild(name);
    const distanceText = document.createElement('p');
    distanceText.classList.add('distanceText');
    distanceText.textContent = store.distanceText;
    panel.appendChild(distanceText);
  });

  // Open the panel
  panel.classList.add('open');

  return;
}

function getLatLngByZipcode(zipcode, lati, long) 
{
    var geocoder = new google.maps.Geocoder();
    var address = zipcode;
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            //alert("Latitude: " + latitude + "\nLongitude: " + longitude);
            //document.getElementById(lati).innerHTML = latitude;
            //document.getElementById(long).innerHTML = longitude;
        } else {
            //alert("Geocode was not successful for the following reason: " + status)
            //document.getElementById(div).innerHTML = 'No se pudo';
        }
    });
    print([latitude, longitude]);
    //alert('Latitude: ' + latitude + ' Logitude: ' + longitude);
}


// When the user selects a city, get the place details for the city and
// zoom the map in on the city.
function onPlaceChanged() {
  const place = autocomplete.getPlace();

  if (place.geometry && place.geometry.location) {
    //var latitude = results[0].geometry.location.lat();

    map.panTo(place.geometry.location);
    map.setZoom(12);
    //document.getElementById("listalugares").innerHTML = place.geometry.location.lat()+', '+place.geometry.location.lng();
    mostrarSucursales(place.geometry.location.lat(), place.geometry.location.lng());
    //search();
  } else {
    document.getElementById("autocomplete").placeholder = "Escribe la localidad";
  }
}


// Set the country restriction based on user input.
// Also center and zoom the map on the given country.
function setAutocompleteCountry() {
  const country = document.getElementById("country").value;

  if (country == "all") {
    autocomplete.setComponentRestrictions({ country: [] });
    map.setCenter({ lat: 15, lng: 0 });
    map.setZoom(2);
  } else {
    autocomplete.setComponentRestrictions({ country: country });
    map.setCenter(countries[country].center);
    map.setZoom(countries[country].zoom);
    mostrarSucursalespais(country);
  }

  clearResults();
  clearMarkers();
}