'use client';
import { Artwork } from "@/types";
import { createContext, useState } from "react";
import L from "leaflet";

export type AppSettings = null | {
  map: L.Map | null,
  setMap: React.Dispatch<React.SetStateAction<L.Map | null>>,
  mapPosition: {
    lat: number,
    lng: number
  },
  setMapPosition: React.Dispatch<React.SetStateAction<{
    lat: number,
    lng: number
  }>>,
  popupSettings: PopupSettings,
}

export type PopupSettings = null | {
  showPopup: boolean,
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>,
  popupTitle: string,
  setPopupTitle: React.Dispatch<React.SetStateAction<string>>,
  popupSubtitle: string,
  setPopupSubtitle: React.Dispatch<React.SetStateAction<string>>,
  popupText: string,
  setPopupText: React.Dispatch<React.SetStateAction<string>>,
  popupImages: Artwork[],
  setPopupImages: React.Dispatch<React.SetStateAction<Artwork[]>>
};

export const appSettings = createContext(null as AppSettings);

function Context(
  { children }: { children: React.ReactNode }
): JSX.Element {
  const [showPopup, setShowPopup] = useState(false as boolean);
  const [popupTitle, setPopupTitle] = useState("" as string);
  const [popupSubtitle, setPopupSubtitle] = useState("" as string);
  const [popupText, setPopupText] = useState("" as string);
  const [popupImages, setPopupImages] = useState([] as Artwork[]);
  const [map, setMap] = useState(null as L.Map | null);
  const [mapPosition, setMapPosition] = useState({lat: 25, lng: -5});
  const defaultAppSettings = {
    map, setMap,
    mapPosition, setMapPosition,
    popupSettings: {
      showPopup, setShowPopup,
      popupTitle, setPopupTitle,
      popupSubtitle, setPopupSubtitle,
      popupText, setPopupText,
      popupImages, setPopupImages
    }
  };

  return (
    <appSettings.Provider value={defaultAppSettings}>
      {children}
    </appSettings.Provider>
  );
};

export default Context