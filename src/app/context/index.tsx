'use client';
import { Artwork } from "@/types";
import { createContext, useState } from "react";

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

export const popupSettings = createContext(null as PopupSettings);

function Context(
  { children }: { children: React.ReactNode }
): JSX.Element {
  const [showPopup, setShowPopup] = useState(false as boolean);
  const [popupTitle, setPopupTitle] = useState("" as string);
  const [popupSubtitle, setPopupSubtitle] = useState("" as string);
  const [popupText, setPopupText] = useState("" as string);
  const [popupImages, setPopupImages] = useState([] as Artwork[]);
  const defaultPopupSettings = {
    showPopup, setShowPopup,
    popupTitle, setPopupTitle,
    popupSubtitle, setPopupSubtitle,
    popupText, setPopupText,
    popupImages, setPopupImages
  };

  return (
    <popupSettings.Provider value={defaultPopupSettings}>
      {children}
    </popupSettings.Provider>
  );
};

export default Context