import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    target: 'es2020',

    // ── Reduce unused JS (fixes Lighthouse TBT 450ms) ──
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,       // Remove console.logs in prod
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.warn'],
        passes: 2,                // Extra minification pass
      },
      mangle: { safari10: true },
    },

    // ── Code splitting (reduces initial JS load) ──
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Core React — always needed
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react'
          }
          // GSAP — heavy, lazy-loadable
          if (id.includes('node_modules/gsap')) {
            return 'vendor-gsap'
          }
          // Framer Motion — heavy, lazy-loadable
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-motion'
          }
          // Icons — large library, split separately
          if (id.includes('node_modules/react-icons')) {
            return 'vendor-icons'
          }
          // EmailJS — only needed in contact section
          if (id.includes('node_modules/@emailjs')) {
            return 'vendor-emailjs'
          }
          // Radix UI components
          if (id.includes('node_modules/@radix-ui')) {
            return 'vendor-radix'
          }
        },
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },

    // ── Chunk size warning threshold ──
    chunkSizeWarningLimit: 600,

    // ── Source maps only in dev ──
    sourcemap: false,

    // ── CSS code splitting ──
    cssCodeSplit: true,
  },

  // ── Dev server optimizations ──
  server: {
    warmup: {
      clientFiles: ['./src/main.tsx', './src/App.tsx', './src/components/sections/Hero.tsx'],
    },
  },

  // ── Optimize deps (faster HMR) ──
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-icons/fa', 'react-icons/fi', 'react-icons/si'],
  },
})