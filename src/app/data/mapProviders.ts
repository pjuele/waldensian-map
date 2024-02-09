import L from "leaflet";

const mapProviders = new Map<string, L.TileLayer>();
mapProviders.set(
    "Default",
    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
    )
);
mapProviders.set(
    "OpenTopoMap",
    L.tileLayer(
        'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        {
            maxZoom: 17,
            attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        }
    )
);
mapProviders.set(
    "Dark",
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}',
    {
	    minZoom: 0,
	    maxZoom: 20,
	    attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	    ext: 'png'
    } as L.TileLayerOptions)
);
mapProviders.set(
    "WorldImagery",
    L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
	        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        }
    )
);

export default mapProviders;
