'use client';

import { useEffect } from 'react';

export function FontLoader() {
  useEffect(() => {
    const link = document.querySelector('link[media="print"]');
    if (link) {
      link.setAttribute('media', 'all');
    }
  }, []);

  return (
    <>
      <link 
        rel="preconnect" 
        href="https://fonts.googleapis.com" 
        crossOrigin="anonymous" 
      />
      <link 
        rel="preconnect" 
        href="https://fonts.gstatic.com" 
        crossOrigin="anonymous" 
      />
      <link 
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;700&display=swap" 
        rel="stylesheet"
        media="print"
      />
      <noscript>
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;700&display=swap" 
          rel="stylesheet"
        />
      </noscript>
    </>
  );
} 