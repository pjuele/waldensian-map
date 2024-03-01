'use client';
import { Separator } from '@radix-ui/react-menubar';
import {Popup} from 'react-leaflet'
import Markdown from 'react-markdown';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Link1Icon } from '@radix-ui/react-icons';
import { MyMarker } from '@/types';
import rehypeHighlight from 'rehype-highlight';

export default function MarkerPopup({location}: {location: MyMarker}) {
    return(
        <Popup
            position={{ lat: location.coordinates.latitude, lng: location.coordinates.longitude }}
            className='w-[40vw] max-w-[40vw] max-h-[40vh] h-[40vh]'
             >
            <h1>{location.name}</h1>
            <Separator />
            {location.imageUrl && 
                <div className="w-full h-[200px] overflow-hidden">
                    <Image
                        className="object-cover w-full h-[200px]"
                        src={location.imageUrl} alt={location.name} width={300} height={100} />
                </div>
            }
            <Markdown className="h-[400px] max-h-[400px] overflow-x-clip overflow-y-scroll mb-3">
                    {location.description}
            </Markdown>

            <Separator />

            {/* {location.links?.map((link: string, index: number) => (
                <Badge variant="outline" key={index} className="m-1">
                    <a href={link} target="_blank">more&nbsp;<Link1Icon /></a>
                </Badge>
            ))} */}
            <Badge variant="outline" className="m-1">
                <a href={location.links} target="_blank">more&nbsp;<Link1Icon /></a>
            </Badge>
        </Popup>
    )
}