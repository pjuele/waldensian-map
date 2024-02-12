'use client';

import Image from 'next/image';
import {useState, useRef} from 'react';
import {MapContainer, Marker, Popup, TileLayer, Tooltip} from 'react-leaflet'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import markers from '../data/markers.json' assert { type: "json" };
import 'leaflet/dist/leaflet.css';
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { Separator } from '@radix-ui/react-menubar';
import { Badge } from "@/components/ui/badge"

export default function MyMap() {
    const [center, setCenter] = useState({ lat: 44.89073533659554, lng: 7.053455540448833 })
    const ZOOM_LEVEL = 6
    const mapRef = useRef(null);
    return(
        <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}
            className="w-full h-screen z-0">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
            />
            {markers && markers.map((location) =>(
                <Marker
                    position={location.coords as L.LatLngExpression}
                    key={location.name}
                    title={location.name}
                    riseOnHover
                >

                    <Popup>
                        <h1>{location.name}</h1>
                        <Separator />
                        {location.image && 
                            <Image
                                className="w-full"
                                src={location.image} alt={location.name} width={100} height={100} />
                        }
                        <p>{location.text}</p>
                        {location.links && <Separator />}
                        {location.links?.map((link, index) => (
                            <Badge variant="outline" key={index} className="m-1">
                                <a href={link.href} target="_blank">{link.text}</a>
                            </Badge>
                        ))}
                    </Popup>

                    <Tooltip>
                        {location.name}
                    </Tooltip>
                </Marker>
            ))}
        </MapContainer>
    );
    // const [finishedLoading, setFinishedLoading] = useState(false);
    // const [mapInitialised, setMapInitialised] = useState(false);
    // useEffect(() => {
    //     if (!finishedLoading) {
    //         setFinishedLoading(true);
    //     }
    // }, [finishedLoading]);

    // if (!finishedLoading) {
    //     // We can't initialise the map until the page is finished loading!
    //     return null;
    // }
    // // OK, we can initialise the map (page is finished loading)
    // if (!mapInitialised && process.env.browser) {
    //     // If we haven't done this yet, initialise the map (so, ONLY ONCE)
    //     try {
    //         let current_lat = -34.340302235214274; // 28.625789;
    //         let current_long = -57.26839596042293; // 77.0547899;
    //         let current_zoom = 12;
    //         let center_lat = current_lat;
    //         let center_long = current_long;
    //         let center_zoom = current_zoom;

    //         // The <div id="map"> must be added to the dom before calling L.map('map')
    //         let map = L.map('map', {
    //             center: [center_lat, center_long],
    //             zoom: center_zoom
    //         });

    //         // const providerName = "Default";
    //         // const providerName = "WorldImagery";
    //         const providerName = "OpenTopoMap";
    //         // const providerName = "Dark";

    //         var OpenTopoMap = mapProviders.get(providerName);
    //         if (OpenTopoMap) {
    //             OpenTopoMap.addTo(map);
    //             var settlementIcon = L.icon({
    //                 iconUrl: 'emblem.png',
    //                 // shadowUrl: 'emblem-shadow.png',
                
    //                 iconSize:     [64, 64], // size of the icon
    //                 // shadowSize:   [64, 64], // size of the shadow
    //                 iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
    //                 // shadowAnchor: [-5, -5],  // the same for the shadow
    //                 popupAnchor:  [32, 5] // point from which the popup should open relative to the iconAnchor
    //             });
    //             for (var marker of markers) {
    //                 L.marker(marker.coords as L.LatLngExpression, {icon: settlementIcon}).addTo(map).bindPopup(marker.text);;
    //             }
    //         }
    //         setMapInitialised(true);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    // return (
    //     <div id="map" className="w-full h-screen"></div>
    // );
}