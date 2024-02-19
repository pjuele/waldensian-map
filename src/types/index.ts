export interface Artwork {
  artist: string;
  art: string;
}

export type Coordinates = {
  latitude: number
  longitude: number
}

export type MyMarker = {
  id: string
  name: string
  coordinates: Coordinates
  image?: string
  description?: string
  createdAt?: string
  publishedAt?: string
  updatedAt?: string
  imageUrl: string
  links: string[]
}