// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    // C. Auditoría de Semántica y Accesibilidad - 13. lang en la etiqueta <html>
    <Html lang="es">
      <Head>
        {/* Aquí se pueden añadir links de preload globales o meta tags que no cambian por página */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}