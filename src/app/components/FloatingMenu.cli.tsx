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
import { Badge } from "@/components/ui/badge";

export default function FloatingMenu() {
    const popupSettings = useContext(appSettings)?.popupSettings;
    const setShowPopup = popupSettings?.setShowPopup || (() => {});
    const setTitle = popupSettings?.setPopupTitle || (() => {});
    const setSubtitle = popupSettings?.setPopupSubtitle || (() => {});
    const setText = popupSettings?.setPopupText || (() => {});
    const setImages = popupSettings?.setPopupImages || (() => {});
    const map = useContext(appSettings)?.map;
    const buttons = [
        {title: "🇫🇷 France", flyTo: [45.24153127420497, 1.374880125186357], zoom: 7},
        {title: "🇩🇪 Germany", flyTo: [50.333098644339366, 10.163852416330544], zoom: 7},
        {title: "🇮🇹 Piedmont", flyTo: [45.08415686991131, 7.765991952323152]},
        {title: "🇮🇹 Calabria", flyTo: [39.37573892988883, 16.252504627114753]},
        {title: "🇺🇾 Uruguay", flyTo: [-34,-56.5], zoom: 9},
    ];

    return (
        <div className="z-20 absolute top-0 right-0 p-3 rounded-lg shadow-lg flex flex-row gap-2 align-middle">
            {buttons.map(({title, flyTo, zoom = 8}) =>
                <Button variant={"default"} key={title}
                    className="py-0 px-2"
                    onClick={() => {
                        if (map) map?.flyTo(flyTo as [number, number], zoom);
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