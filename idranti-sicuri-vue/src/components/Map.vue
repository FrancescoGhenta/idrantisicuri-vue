<template>
    <div id="mappa"></div>
</template>

<script>
import L from 'leaflet';

export default {
    name: 'Map',
    data() {
        return {
            map: null,
            jsonData: [],
            geolocPerm: null,
            geoloc: []
        }
    },
    mounted() {
        this.start();
    },
    methods: {
        async loadJson(path) {
            const response = await fetch(path);
            this.jsonData = await response.json();
        },
        async askGeolocationPermission() {
            return new Promise((resolve) => {
                if (!("geolocation" in navigator)) {
                    this.geolocPerm = false;
                    resolve(false);
                } else {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            this.geolocPerm = true;
                            resolve(true);
                        },
                        (error) => {
                            this.geolocPerm = false;
                            resolve(false);
                        }
                    );
                }
            });
        },
        async start() {
            this.map = L.map('mappa', { minZoom: 1, maxZoom: 20 }).setView([45.438913, 10.994400], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors', maxZoom: 20 }).addTo(this.map);
            this.geolocPerm = await this.askGeolocationPermission();
            if (this.geolocPerm) {
                try {
                    this.geoloc = await this.getLocalCoordinates();
                } catch (e) {
                    console.error("Errore nel recuperare la posizione:", e);
                }
            }
            await this.loadJson('./db.json');
            this.loadPins(this.map);
            if (this.geolocPerm) {
                this.loadUserMarker(this.map);
            }
        },
        loadPins(map) {
            const redPin = new L.Icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
                shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
            const greyPin = new L.Icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png',
                shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
            this.jsonData.forEach((item, i) => {
                let popup = `
                    <h1 id="id_pin">${item.id}</h1>
                    <p>Coordinate: ${item.location_lat}, ${item.location_lon}</p>
                    <p>Operativo: ${item.operative ? 'Sì' : 'No'}</p>
                `;
                if (this.geolocPerm) {
                    popup += `<a href=\"https://www.google.com/maps?saddr=${this.geoloc[0]},${this.geoloc[1]}&daddr=${item.location_lat},${item.location_lon}\"><button class=\"btn-primary\" id=\"button_info_pin\">Apri in Maps</button></a>`;
                } else {
                    popup += `<a href=\"#\"><button disabled class=\"btn-primary\" id=\"button_info_pin\">Apri in Maps</button></a>`;
                }
                popup += `<a href='./info_idr/index.html?${item.id}'><button class=\"btn-primary\" id=\"button_info_pin\">Vedi dettagli</button></a>`;
                const icon = item.operative ? redPin : greyPin;
                L.marker([item.location_lat, item.location_lon], { icon }).addTo(map).bindPopup(popup);
            });
        },
        loadUserMarker(map) {
            const userPin = new L.Icon({
                iconUrl: '../assets/userMarker.png',
                iconSize: [20, 20],
                iconAnchor: [10, 10],
            });
            try {
                let userMarker = null;
                map.locate({ watch: true, setView: false });
                map.on('locationfound', function (e) {
                    if (!userMarker) {
                        userMarker = L.marker(e.latlng, { icon: userPin }).addTo(map);
                        map.flyTo(e.latlng, 15);
                    } else {
                        userMarker.setLatLng(e.latlng);
                    }
                });
            } catch (e) {
                console.error("Errore nel recuperare la posizione:", e);
            }
        },
        async getLocalCoordinates() {
            return new Promise((resolve, reject) => {
                if ("geolocation" in navigator) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const coord = [
                                position.coords.latitude,
                                position.coords.longitude
                            ];
                            resolve(coord);
                        },
                        (error) => {
                            console.error("Errore posizione:", error);
                            reject(error);
                        }
                    );
                } else {
                    const errorMsg = "Localizzazione non supportata";
                    console.error(errorMsg);
                    reject(new Error(errorMsg));
                }
            });
        }
    }
}
</script>

<style scoped>
#mappa {
  height: 95vh;
  position: relative;
}
</style>