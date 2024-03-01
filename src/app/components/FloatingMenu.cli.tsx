'use client';

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
  } from "@/components/ui/menubar"
import { TextAlignJustifyIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { appSettings } from "@/app/context";
import works from "../data/works";
import waldensiansContent from "../data/waldensiansContent";
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import meaningfulRegions from "../data/meaningfulRegions.data";

function callFlyTo(
    map: L.Map,
    title: string,
    coordinates: [number, number],
    zoom: number,
    toast: (arg0: any) => any,
    toastMessage: string,
    ): void {
    if (map) map.flyTo(coordinates, zoom);
    toast({
        title: "✈ Flying to:   " + title,
        description: toastMessage,
    });
}
export default function FloatingMenu() {
    const popupSettings = useContext(appSettings)?.popupSettings;
    const setShowPopup = popupSettings?.setShowPopup || (() => {});
    const setTitle = popupSettings?.setPopupTitle || (() => {});
    const setSubtitle = popupSettings?.setPopupSubtitle || (() => {});
    const setText = popupSettings?.setPopupText || (() => {});
    const setImages = popupSettings?.setPopupImages || (() => {});
    const map = useContext(appSettings)?.map;
    const {toast} = useToast();

    return (
        <div className="z-20 absolute top-0 right-0 p-3 rounded-lg shadow-lg flex flex-row gap-2 align-middle">
            {meaningfulRegions.map(({title, coords, zoom = 8, toastMessage}) =>
                <Button variant={"default"} key={title}
                    className="py-0 px-2"
                    onClick={() => {
                        callFlyTo(map as L.Map, title, coords as [number, number], zoom, toast, toastMessage);
                    }}>
                    {title}
                </Button>
            )}
            {/* <Button onClick={() => {map?.flyTo([44.1329007,-1.398255], 11);}}>🇫🇷 France</Button> */}
            <Menubar className="w-max inline-flex">
            <MenubarMenu>
                <MenubarTrigger className="text-xl"><TextAlignJustifyIcon /></MenubarTrigger>
                <MenubarContent className="w-56 me-3">
                    <MenubarItem onClick={function () {
                        const {title, subTitle, text, images} = waldensiansContent;

                        setTitle(title);
                        setSubtitle(subTitle);
                        setText(text);
                        setImages(works);
                        setShowPopup(true);
                    }}>
                    Waldensians <MenubarShortcut>⌘1</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem onClick={function () {
                        setTitle("About Waldendian Map");
                        setSubtitle("A tribute to the deep roots of my family and the stubbornly decent people that shaped our lives through the centuries.");
                        setText("This website is a work in progress. More features will be added in the future. Stay tuned!");
                        setImages([{
                            art: "https://res.cloudinary.com/wdpj/image/upload/c_scale,q_auto,w_350/v1636746639/web-design-pablo-juele/logos/wdpj-logo_ddlpop.jpg",
                            artist: "Web Design Pablo Juele",
                        }]);
                        setShowPopup(true);
                    }}>
                        About
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            </Menubar>
        </div>
    );
}