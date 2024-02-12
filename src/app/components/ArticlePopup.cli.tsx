'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Artwork } from "@/types";
import Image from "next/image";
import { PopupSettings, popupSettings } from "../context";
import { useContext } from "react";
import { Cross1Icon } from "@radix-ui/react-icons";
import Markdown from 'react-markdown';
import rehypeHighlight from "rehype-highlight";

export default function ArticlePopup(
    // {title, subTitle, text, images = []}:
    // {title: string; subTitle?: string; text: string; images: Artwork[]}
) {
    const settings: PopupSettings = useContext(popupSettings);
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
            className="z-20 w-2/3 h-[90%] max-h-[90%] absolute top-10 left-20 rounded-lg shadow-lg">
            <CardHeader>
                <CardTitle>
                    <Cross1Icon className="float-right" onClick={() => showPopupSetter(false)}/>
                    {title}
                </CardTitle>
                <CardDescription>{subTitle}</CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[74vh] w-full rounded-sm border p-3 p-x-4">
                    <Markdown rehypePlugins={[rehypeHighlight]}>
                        {text}
                    </Markdown>
                </ScrollArea>
            </CardContent>
            <CardFooter>
            {/* <ScrollArea className="w-full h-44 whitespace-nowrap">
                <div className="flex w-max space-x-4">
                    {images.map((artwork) => (
                    <figure key={artwork.artist} className="shrink-0">
                        <div className="overflow-hidden rounded-md">
                        <Image
                            src={artwork.art}
                            alt={`Photo by ${artwork.artist}`}
                            className="aspect-[3/4] h-fit w-fit object-cover"
                            width={100}
                            height={200}
                        />
                        </div>
                        <figcaption className="pt-2 text-xs text-muted-foreground">
                        Photo by{" "}
                        <span className="font-semibold text-foreground">
                            {artwork.artist}
                        </span>
                        </figcaption>
                    </figure>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
                </ScrollArea> */}
            </CardFooter>
        </Card>
    );
} 