'use client';
import { Separator } from '@radix-ui/react-menubar';
import {Popup} from 'react-leaflet'
import Markdown from 'react-markdown';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Link1Icon } from '@radix-ui/react-icons';
import { MyMarker } from '@/types';

export default function MarkerPopup({location}: {location: MyMarker}) {
    return(
        <Popup
            position={{ lat: location.coordinates.latitude, lng: location.coordinates.longitude }}
             >
            <h1>{location.name}</h1>
            <Separator />
            {location.imageUrl && 
                <Image
                    className="w-full"
                    src={location.imageUrl} alt={location.name} width={100} height={100} />
            }
            <Markdown className="overflow-y-scroll">
                {location.description}
            </Markdown>

            <Separator />

            {location.links?.map((link: string, index: number) => (
                <Badge variant="outline" key={index} className="m-1">
                    <a href={link} target="_blank">more&nbsp;<Link1Icon /></a>
                </Badge>
            ))}
        </Popup>
    )
}