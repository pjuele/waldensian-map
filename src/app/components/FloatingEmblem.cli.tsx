'use client';

import Image from "next/image";
import waldensiansContent from "../data/waldensiansContent";
import { useContext } from "react";
import { appSettings } from "@/app/context";

export default function FloatingEmblem() {
    const popupSettings = useContext(appSettings)?.popupSettings;
    const setShowPopup = popupSettings?.setShowPopup || (() => {});
    const setTitle = popupSettings?.setPopupTitle || (() => {});
    const setSubtitle = popupSettings?.setPopupSubtitle || (() => {});
    const setText = popupSettings?.setPopupText || (() => {});
    const setImages = popupSettings?.setPopupImages || (() => {});
    return (
        <div className="z-10 absolute bottom-4 left-9 flex flex-col gap-2 align-middle justify-center">
            <Image className="drop-shadow-[0_4px_4px_rgba(0,0,0,1)]"
                src="/LuxLucetLogo.png"
                alt="Emblem"
                width={150}
                height={177}
                priority
                onClick={function () {
                    const {title, subTitle, text, images} = waldensiansContent;

                    setTitle(title);
                    setSubtitle(subTitle);
                    setText(text);
                    setImages([]);
                    setShowPopup(true);
                }}
            />
            <h3 className="drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">Waldensian Map</h3>
        </div>
    );
}