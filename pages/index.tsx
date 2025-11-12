'use client'; // Este es el espacio del habitante, vive en el cliente.

import Head from 'next/head';
import { Suspense } from 'react';
import { Scene } from '@/components/Scene'; // Asumiendo que Scene es ahora el Templo
import { SEO_CONFIG } from '../src/config/seo';
import { THEME_COLOR } from '../src/config';

// El Invocador: El estado de conciencia antes de que el Templo se manifieste.
const Invocador = () => (
  <div className="flex h-screen w-screen items-center justify-center" style={{ background: 'rgb(var(--color-void))' }}>
    <div className="text-center">
      {/* El punto de luz inicial, el corazón del universo esperando nacer. */}
      <div className="mx-auto h-2 w-2 animate-pulse-slow rounded-full" style={{ backgroundColor: 'rgb(var(--color-aura-primary))' }} />
      <p className="mt-4 text-xs font-light tracking-widest text-white/40 animate-think">
        Despertando...
      </p>
    </div>
  </div>
);

export default function Home() {
  return (
    <>
      <Head>
        {/* Los metadatos son la inscripción en la entrada del Templo. */}
        <title>{SEO_CONFIG.title.default}</title>
        <meta name="description" content={SEO_CONFIG.description} />
        <meta property="og:title" content={SEO_CONFIG.openGraph.title} />
        <meta property="og:description" content={SEO_CONFIG.openGraph.description} />
        <meta property="og:image" content={SEO_CONFIG.ogImage} />
        <meta property="og:url" content={SEO_CONFIG.ogUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content={SEO_CONFIG.twitterCard} />
        <meta name="twitter:site" content={SEO_CONFIG.twitterSite} />
        <meta name="twitter:title" content={SEO_CONFIG.openGraph.title} />
        <meta name="twitter:description" content={SEO_CONFIG.openGraph.description} />
        <meta name="twitter:image" content={SEO_CONFIG.ogImage} />
        <link rel="icon" href={SEO_CONFIG.favicon} />
        <meta name="theme-color" content={THEME_COLOR} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="relative h-screen w-screen">
        <Suspense fallback={<Invocador />}>
          <Scene />
        </Suspense>
      </main>
    </>
  )
}
