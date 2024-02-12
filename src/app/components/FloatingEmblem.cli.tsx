'use client';

import Image from "next/image";
import { useState } from "react";

export default function FloatingEmblem() {
    const [showLogo, setShowLogo] = useState(true);
    // setTimeout(() => setShowLogo(false), 3000);
    return (
        <div hidden={!showLogo} className="z-10 absolute bottom-4 left-9 flex flex-col gap-2 align-middle justify-center">
            <Image className="drop-shadow-[0_4px_4px_rgba(0,0,0,1)]"
                src="/LuxLucetLogo.png"
                alt="Emblem"
                width={150}
                height={177}
                priority
            />
            <h3 className="drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">Waldensian Map</h3>
        </div>
    );
}