#!/usr/bin/env node

import { build } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function buildStatic() {
  try {
    console.log('🏗️  Building static files for production...');
    
    await build({
      root: __dirname,
      build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
          input: {
            main: resolve(__dirname, 'index.html')
          }
        }
      }
    });
    
    console.log('✅ Static build completed successfully!');
    console.log('📁 Files generated in ./dist directory');
    console.log('🚀 Ready for deployment to Vercel or any static hosting service');
    
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

buildStatic();