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
import { popupSettings } from "@/app/context";
import works from "../data/works";
import waldensiansContent from "../data/waldensiansContent";

export default function FloatingMenu() {
    const setShowPopup = useContext(popupSettings)?.setShowPopup || (() => {});
    const setTitle = useContext(popupSettings)?.setPopupTitle || (() => {});
    const setSubtitle = useContext(popupSettings)?.setPopupSubtitle || (() => {});
    const setText = useContext(popupSettings)?.setPopupText || (() => {});
    const setImages = useContext(popupSettings)?.setPopupImages || (() => {});

    return (
        <div className="z-20 absolute top-0 right-0 p-3 rounded-lg shadow-lg">
            <Menubar>
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
                    <MenubarItem>
                        Piemonte <MenubarShortcut>⌘2</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                        Calabria
                        <MenubarShortcut>⌘3</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>Uruguay</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>About</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            </Menubar>
        </div>
    );
}