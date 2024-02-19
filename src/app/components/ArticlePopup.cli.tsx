'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Artwork } from "@/types";
import { AppSettings, PopupSettings, appSettings } from "../context";
import { useContext } from "react";
import { Cross1Icon } from "@radix-ui/react-icons";
import Markdown from 'react-markdown';
import rehypeHighlight from "rehype-highlight";

export default function ArticlePopup(
    // {title, subTitle, text, images = []}:
    // {title: string; subTitle?: string; text: string; images: Artwork[]}
) {
    const settings: PopupSettings = useContext(appSettings)?.popupSettings || null;
    const showPopup: boolean = settings?.showPopup || false;
    const showPopupSetter: React.Dispatch<React.SetStateAction<boolean>>
        = settings?.setShowPopup || (() => {});
    if (!showPopup) {
        return null;
    }
    const title: string = settings?.popupTitle || "";
    const subTitle: string = settings?.popupSubtitle || "";
    const text: string = settings?.popupText || "";
    const images: Artwork[] = settings?.popupImages || [] as Artwork[];

    return (
        <Card
            hidden={!showPopup}
            onClick={() => showPopupSetter(false)}
            onBlur={() => showPopupSetter(false)}
            className="z-20 w-2/3 h-[85%] max-h-[85%] absolute bottom-14 right-3 rounded-lg shadow-lg">
            <CardHeader>
                <CardTitle>
                    <Cross1Icon className="float-right" onClick={() => showPopupSetter(false)}/>
                    {title}
                </CardTitle>
                <CardDescription>{subTitle}</CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[64vh] w-full rounded-sm border p-3 p-x-4">
                    <Markdown rehypePlugins={[rehypeHighlight]}>
                        {text}
                    </Markdown>
                </ScrollArea>
            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card>
    );
} 