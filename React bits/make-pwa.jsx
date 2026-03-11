/* npm install -D vite-plugin-pwa */


/* in main.jsx */
import { registerSW } from 'virtual:pwa-register'
registerSW({ immediate: true })


/* in vite-env.d.js */
/// <reference types="vite-plugin-pwa/client" />


/* in vite.config.js */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['conqueror-192x192.png', 'conqueror-512x512.png', 'sitemap.xml'],
      workbox: {     /* workbox is mainly for caching and cache lifetime */
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 /* cache lifetime (365 days) */
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 /* image cache */
              }
            }
          }
        ]
      },
      manifest: {
        name: 'Conquest IO: Total Domination',
        short_name: 'ConquestIO',
        description: 'Ultimate strategy game to conquer the galaxy',
        theme_color: '#111827',
        background_color: '#111827',
        display: 'standalone', /* important */
        icons: [
          {
            src: 'conqueror-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'conqueror-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})
