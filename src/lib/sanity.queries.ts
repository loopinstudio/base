import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'

export const homeQuery = groq`*[_type == "page"]`

export async function getHome(client: SanityClient): Promise<Home[]> {
  return await client.fetch(homeQuery)
}

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]`

 
export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export interface Home {
  _type: 'post'
  _id: string
  _createdAt: string
  title?: string
  slug: Slug
  excerpt?: string
  mainImage?: ImageAsset
  body: PortableTextBlock[]
}
