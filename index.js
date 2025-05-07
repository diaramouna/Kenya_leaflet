 const map = L.map('map').setView([-1.2921, 36.8219], 7); 
        
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
 }).addTo(map);
 
 const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
     attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
 });
 
 const terrainLayer = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png', {
     attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
     subdomains: 'abcd',
     minZoom: 0,
     maxZoom: 18
 });
 
 const parksCluster = L.markerClusterGroup();
 const citiesCluster = L.markerClusterGroup();
 const landmarksCluster = L.markerClusterGroup();
 const conservationCluster = L.markerClusterGroup();
 
 const pois = [
     { name: "Parc National du Masai Mara", type: "park", lat: -1.4833, lng: 35.0000, description: "Célèbre pour la migration annuelle des gnous et sa riche faune" },
     { name: "Parc National d'Amboseli", type: "park", lat: -2.6527, lng: 37.2606, description: "Offre des vues spectaculaires du Kilimandjaro et abrite de nombreux éléphants" },
     { name: "Parc National de Tsavo Est", type: "park", lat: -3.5000, lng: 38.7000, description: "Le plus grand parc national du Kenya" },
     { name: "Parc National de Tsavo Ouest", type: "park", lat: -3.5000, lng: 38.0000, description: "Connu pour ses sources Mzima et sa diversité d'habitats" },
     { name: "Parc National du Lac Nakuru", type: "park", lat: -0.3667, lng: 36.0833, description: "Célèbre pour ses flamants roses et rhinocéros" },
     { name: "Parc National Aberdare", type: "park", lat: -0.4167, lng: 36.7500, description: "Forêt montagneuse avec une faune diversifiée" },
     
     { name: "Nairobi", type: "city", lat: -1.2921, lng: 36.8219, description: "Capitale et plus grande ville du Kenya" },
     { name: "Mombasa", type: "city", lat: -4.0435, lng: 39.6682, description: "Deuxième plus grande ville et principal port maritime" },
     { name: "Kisumu", type: "city", lat: -0.1022, lng: 34.7617, description: "Troisième plus grande ville, située sur les rives du lac Victoria" },
     { name: "Nakuru", type: "city", lat: -0.3031, lng: 36.0800, description: "Quatrième plus grande ville du Kenya, proche du lac Nakuru" },
     { name: "Eldoret", type: "city", lat: 0.5200, lng: 35.2700, description: "Centre agricole et athlétique important" },
     { name: "Malindi", type: "city", lat: -3.2175, lng: 40.1194, description: "Station balnéaire populaire sur la côte kenyane" },
     
     { name: "Mont Kenya", type: "landmark", lat: -0.1500, lng: 37.3000, description: "Deuxième plus haute montagne d'Afrique" },
     { name: "Lac Victoria", type: "landmark", lat: -0.7500, lng: 33.4500, description: "Plus grand lac d'Afrique et source du Nil" },
     { name: "Fort Jesus", type: "landmark", lat: -4.0619, lng: 39.6775, description: "Fort portugais du 16e siècle à Mombasa, site du patrimoine mondial" },
     { name: "Grande Vallée du Rift", type: "landmark", lat: -0.5000, lng: 36.0000, description: "Vallée géologique spectaculaire traversant le Kenya" },
     { name: "Lac Turkana", type: "landmark", lat: 3.5000, lng: 36.0000, description: "Plus grand lac désertique permanent du monde" },
     { name: "Lamu", type: "landmark", lat: -2.2700, lng: 40.9000, description: "Ancienne ville swahilie, site du patrimoine mondial de l'UNESCO" },
     
     { name: "Conservatoire de Lewa", type: "conservation", lat: 0.2000, lng: 37.4200, description: "Réserve privée reconnue pour la conservation des rhinocéros" },
     { name: "Conservatoire de Ol Pejeta", type: "conservation", lat: 0.0000, lng: 36.9667, description: "Refuge pour les derniers rhinocéros blancs du Nord" },
     { name: "Conservatoire de Samburu", type: "conservation", lat: 0.6167, lng: 37.5333, description: "Habitat d'espèces uniques comme le zèbre de Grévy" },
     { name: "Conservatoire de David Sheldrick", type: "conservation", lat: -1.3156, lng: 36.7851, description: "Centre de réhabilitation des éléphanteaux orphelins" },
     { name: "Ranch de Galana", type: "conservation", lat: -3.0000, lng: 39.0000, description: "Plus grand ranch du Kenya, avec faune sauvage" },
     { name: "Conservatoire de Namunyak", type: "conservation", lat: 1.0667, lng: 37.4167, description: "Géré par la communauté Samburu, habitat d'éléphants" }
 ];
 
 // Icônes personnalisées
 const icons = {
     park: L.icon({
         iconUrl: 'https://cdn-icons-png.flaticon.com/512/3140/3140300.png',
         iconSize: [32, 32],
         iconAnchor: [16, 32],
         popupAnchor: [0, -32]
     }),
     city: L.icon({
         iconUrl: 'https://cdn-icons-png.flaticon.com/512/1946/1946488.png',
         iconSize: [32, 32],
         iconAnchor: [16, 32],
         popupAnchor: [0, -32]
     }),
     landmark: L.icon({
         iconUrl: 'https://cdn-icons-png.flaticon.com/512/3660/3660568.png',
         iconSize: [32, 32],
         iconAnchor: [16, 32],
         popupAnchor: [0, -32]
     }),
     conservation: L.icon({
         iconUrl: 'https://cdn-icons-png.flaticon.com/512/2315/2315493.png',
         iconSize: [32, 32],
         iconAnchor: [16, 32],
         popupAnchor: [0, -32]
     })
 };
 
 pois.forEach(poi => {
     const marker = L.marker([poi.lat, poi.lng], { icon: icons[poi.type] })
         .bindPopup(`<strong>${poi.name}</strong><br>${poi.description}`);
         
     switch(poi.type) {
         case 'park':
             parksCluster.addLayer(marker);
             break;
         case 'city':
             citiesCluster.addLayer(marker);
             break;
         case 'landmark':
             landmarksCluster.addLayer(marker);
             break;
         case 'conservation':
             conservationCluster.addLayer(marker);
             break;
     }
 });
 
 map.addLayer(parksCluster);
 map.addLayer(citiesCluster);
 map.addLayer(landmarksCluster);
 map.addLayer(conservationCluster);
 
 const kenyaBorders = {
     "type": "Feature",
     "properties": {"name": "Kenya"},
     "geometry": {
         "type": "Polygon",
         "coordinates": [[
             [41.58513, -1.68325],
             [40.88477, -0.13169],
             [40.98105, 2.78452],
             [41.59856, 3.42206],
             [40.39501, 4.57037],
             [39.85494, 3.83879],
             [39.55938, 3.42206],
             [38.89251, 3.50074],
             [37.69869, 3.0968],
             [37.7669, 2.84548],
             [36.85509, 1.1425],
             [36.16222, 1.03351],
             [35.59747, 1.63087],
             [35.03599, 1.90584],
             [34.47913, 1.17148],
             [34.01013, 1.05748],
             [33.90371, 0.10926],
             [33.80944, -0.95],
             [34.13176, -1.35647],
             [37.69617, -3.09699],
             [37.82764, -3.67712],
             [39.20222, -4.67677],
             [40.31659, -4.1226],
             [40.77867, -3.09045],
             [41.58513, -1.68325]
         ]]
     }
 };
 
 L.geoJSON(kenyaBorders, {
     style: {
         color: "#ff7800",
         weight: 2,
         opacity: 0.65,
         fillOpacity: 0.1
     }
 }).addTo(map);
 
 const baseMaps = {
     "OpenStreetMap": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
     }),
     "Satellite": satelliteLayer,
     "Terrain": terrainLayer
 };
 
 const overlayMaps = {
     "Parcs Nationaux": parksCluster,
     "Villes": citiesCluster,
     "Sites Remarquables": landmarksCluster,
     "Zones de Conservation": conservationCluster
 };
 
 L.control.layers(baseMaps, overlayMaps).addTo(map);
 
 L.control.scale().addTo(map);
 
 const info = L.control({ position: 'bottomleft' });
 info.onAdd = function(map) {
     this._div = L.DomUtil.create('div', 'info-panel');
     this.update();
     return this._div;
 };
 info.update = function() {
     this._div.innerHTML = '<h4>Kenya - Points d\'intérêt</h4>' +
         '<p>Cette carte présente les principaux points d\'intérêt du Kenya.</p>' +
         '<p>Utilisez le contrôle en haut à droite pour filtrer par catégorie.</p>' +
         '<p><strong>Nombre total de POI:</strong> ' + pois.length + '</p>';
 };
 info.addTo(map);
 
 const legend = L.control({ position: 'bottomright' });
 legend.onAdd = function(map) {
     const div = L.DomUtil.create('div', 'legend');
     div.innerHTML = '<h4>Légende</h4>';
     div.innerHTML += '<i style="background-image: url(https://cdn-icons-png.flaticon.com/512/3140/3140300.png); background-size: contain;"></i> Parcs Nationaux<br>';
     div.innerHTML += '<i style="background-image: url(https://cdn-icons-png.flaticon.com/512/1946/1946488.png); background-size: contain;"></i> Villes<br>';
     div.innerHTML += '<i style="background-image: url(https://cdn-icons-png.flaticon.com/512/3660/3660568.png); background-size: contain;"></i> Sites Remarquables<br>';
     div.innerHTML += '<i style="background-image: url(https://cdn-icons-png.flaticon.com/512/2315/2315493.png); background-size: contain;"></i> Zones de Conservation<br>';
     return div;
 };
 legend.addTo(map);
 
 function searchPOI(name) {
     const searchResult = pois.find(poi => poi.name.toLowerCase().includes(name.toLowerCase()));
     if (searchResult) {
         map.setView([searchResult.lat, searchResult.lng], 10);
         L.popup()
             .setLatLng([searchResult.lat, searchResult.lng])
             .setContent(`<strong>${searchResult.name}</strong><br>${searchResult.description}`)
             .openOn(map);
     } else {
         alert("Point d'intérêt non trouvé");
     }
 }
 
 const searchControl = L.control({ position: 'topleft' });
 searchControl.onAdd = function(map) {
     const div = L.DomUtil.create('div', 'search-control');
     div.innerHTML = '<input type="text" id="search-input" placeholder="Rechercher un lieu...">' +
                    '<button id="search-button">Rechercher</button>';
     return div;
 };
 searchControl.addTo(map);
 
 // Événement de recherche
 document.getElementById('search-button').addEventListener('click', function() {
     const searchValue = document.getElementById('search-input').value;
     searchPOI(searchValue);
 });
 
 document.getElementById('search-input').addEventListener('keyup', function(event) {
     if (event.key === 'Enter') {
         const searchValue = document.getElementById('search-input').value;
         searchPOI(searchValue);
     }
 });
 
 const analyzeCircle = L.circle([-1.4833, 35.0000], {
     color: 'green',
     fillColor: '#3f3',
     fillOpacity: 0.2,
     radius: 50000 
 }).addTo(map);
 analyzeCircle.bindPopup("Zone d'analyse autour du Masai Mara (rayon 50km)");
 
 function countPOIsInZone(centerLat, centerLng, radiusInMeters) {
     let count = 0;
     const pois_in_zone = [];
     
     pois.forEach(poi => {
         const R = 6371000; 
         const dLat = (poi.lat - centerLat) * Math.PI / 180;
         const dLon = (poi.lng - centerLng) * Math.PI / 180;
         const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                   Math.cos(centerLat * Math.PI / 180) * Math.cos(poi.lat * Math.PI / 180) *
                   Math.sin(dLon/2) * Math.sin(dLon/2);
         const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
         const distance = R * c;
         
         if (distance <= radiusInMeters) {
             count++;
             pois_in_zone.push(poi.name);
         }
     });
     
     return { count: count, names: pois_in_zone };
 }
 
 const analysisControl = L.control({ position: 'topright' });
 analysisControl.onAdd = function(map) {
     const div = L.DomUtil.create('div', 'info-panel');
     const result = countPOIsInZone(-1.4833, 35.0000, 50000);
     div.innerHTML = '<h4>Analyse spatiale</h4>' +
         '<p><strong>POIs dans un rayon de 50km du Masai Mara:</strong> ' + result.count + '</p>' +
         '<p><small>' + result.names.join(', ') + '</small></p>';
     return div;
 };
 analysisControl.addTo(map);
 
 const route = L.polyline([
     [-1.2921, 36.8219], 
     [-1.4833, 35.0000]  
 ], {
     color: 'blue',
     weight: 3,
     opacity: 0.7,
     dashArray: '10, 10',
     lineJoin: 'round'
 }).addTo(map);
 route.bindPopup("Itinéraire de Nairobi au Masai Mara");
 
 function calculateDistance(lat1, lon1, lat2, lon2) {
     const R = 6371; 
     const dLat = (lat2 - lat1) * Math.PI / 180;
     const dLon = (lon2 - lon1) * Math.PI / 180;
     const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
               Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
               Math.sin(dLon/2) * Math.sin(dLon/2);
     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
     const distance = R * c;
     return distance.toFixed(1); 
 }

 const distancePopup = L.popup({
     closeOnClick: false,
     autoClose: false
 })
     .setLatLng([-1.38, 36]) 
     .setContent("Distance: " + calculateDistance(-1.2921, 36.8219, -1.4833, 35.0000) + " km")
     .addTo(map);