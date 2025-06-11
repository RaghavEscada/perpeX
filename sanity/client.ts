import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: '3dlng0y4',      
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-01-01',
})

// Set up a helper function for generating image URLs
const builder = imageUrlBuilder(client)

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}