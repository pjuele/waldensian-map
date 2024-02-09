/** @type {import('next').NextConfig} */
// now I will add config to prevent a cors origin using leaflet.js maps from https://openstreetmap.org:
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "openstreetmap.org",
            },
            {
                protocol: "https",
                hostname: "*.tile.openstreetmap.org",
            },
            {
                protocol: "https",
                hostname: "tiles.stadiamaps.com",
            },
            {
                protocol: "https",
                hostname: "stadiamaps.com",
            },
        ],
    },
};

export default nextConfig;
