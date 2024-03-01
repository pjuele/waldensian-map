'use client';

import {useState, useRef, useContext, useEffect} from 'react';
import {MapContainer, Marker, TileLayer, Tooltip} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import MarkerPopup from './MarkerPopup';
import { Coordinates, MyMarker } from '@/types';
import { appSettings } from '../context';
import { useToast } from "@/components/ui/use-toast"

type Marker = {
    id: string,
    name: string,
    coordinates: Coordinates,
    image?: string,
    description?: string,
    createdAt?: string,
    publishedAt?: string,
    updatedAt?: string,
    imageUrl: string,
    links: string[],
};

export default function MyMap({markers}: {markers: MyMarker[]}) {
    const ZOOM_LEVEL = 3;

    const mapRef = useRef(null);

    const mapPosition = useContext(appSettings)?.mapPosition;
    // const map = useContext(appSettings)?.map;
    const setMap = useContext(appSettings)?.setMap;

    const [componentMounted, setComponentMounted] = useState(false);
    const [current, setCurrent] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(undefined as boolean | undefined);
    // const [showToast, setShowToast] = useState(false as boolean);
    // const [toastText, setToastText] = useState("");
    const { toast } = useToast()

    const getMediaQueryPreference = () => {
        const mediaQuery = "(prefers-color-scheme: dark)";
        const mql = window.matchMedia(mediaQuery);
        const hasPreference = typeof mql.matches === "boolean";
        mql.addEventListener("change", () => {
          setIsDarkMode(mql.matches);
        })
        if (hasPreference) {
          return mql.matches ? "dark" : "light";
        } else {
          return "light";
        }
      };
    
    // Note to future self:
    // Using map as a trigger for useEffect didn't work.
    // mapRef.current could not be used, and mapRef alone didn't
    // trigger useEffect. So instead I used this extra useEffect that runs
    // on first render (dependencies = []). And fires up a setInterval
    // to check periodically for mapRef.current to have a value.
    // Once that happens, it will set the current map in context
    // and clear the interval. This seems to work.

    useEffect(() => {
        // This will run on first render and set a interval to check periodically for mapRef.current to have a value:
        const interval = setInterval(() => {
            if (!current && mapRef.current) {
                setCurrent(mapRef.current);
                clearInterval(interval);
            }
        }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!componentMounted)  {
            setComponentMounted(true);
        } else {
            setIsDarkMode(getMediaQueryPreference() === "dark");
            // setToastText(isDarkMode ? "☾ Nighttime mode detected!" : "☀ Daytime mode detected!");
            // setShowToast(true);
            toast({
                title: "Map settings updated!",
                description: isDarkMode ? "☾ Nighttime mode detected!" : "☀ Daytime mode detected!",
              })
            if (setMap && current) setMap(current);
        }
    }, [componentMounted, setMap, current, isDarkMode, toast]);

    if (!componentMounted || !mapPosition) {
        return null;
    }

    return(
        <MapContainer
            center={mapPosition}
            zoom={ZOOM_LEVEL}
            minZoom={3}
            maxBounds={[[80, 180], [-70, -180]]}
            ref={mapRef}
            className="w-full h-screen z-0">
            <TileLayer
                // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url={isDarkMode ?
                    'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' :
                    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                }
                // url='https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png'
                />
            {markers && markers.map((location, index) => (
                <div key={index}>
                {/* <LogLocation location={location}/> */}
                <Marker
                key={index}
                position={{ lat: location.coordinates.latitude, lng: location.coordinates.longitude }}
                title={location.name}
                riseOnHover
                >
                    <MarkerPopup location={location} />
                    <Tooltip>
                        {location.name}
                    </Tooltip>
                </Marker>
                </div>
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