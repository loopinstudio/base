import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useLiveQuery } from 'next-sanity/preview'

import Card from '~/components/Card'
import Container from '~/components/Layout'
import Welcome from '~/components/Welcome'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { urlForImage } from '~/lib/sanity.image'
import { getHome, type Home, homeQuery } from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'

export const getStaticProps: GetStaticProps = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const [home] = await getHome(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      home,
    },
  }
}

export default function IndexPage({ home }) {
  const { title, excerpt, mainImage } = home
  return (
    <Container>
      <div>
     <h1 className="text-3xl font-bold underline">
{title}</h1>
        <p>{excerpt}</p>
        <img src={urlForImage(mainImage)} alt="img" />
      </div>
    </Container>
  )
}
