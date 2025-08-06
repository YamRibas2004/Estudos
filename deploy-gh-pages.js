#!/usr/bin/env node

/**
 * Script de deploy para GitHub Pages
 * Este script constrói o projeto para funcionar no GitHub Pages
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Iniciando build para GitHub Pages...');

try {
  // 1. Build do frontend com configurações para GitHub Pages
  console.log('📦 Construindo aplicação...');
  process.env.VITE_BUILD_FOR_GITHUB_PAGES = 'true';
  execSync('vite build', { 
    stdio: 'inherit',
    cwd: __dirname,
    env: { 
      ...process.env, 
      NODE_ENV: 'production',
      VITE_BUILD_FOR_GITHUB_PAGES: 'true'
    }
  });

  // 2. Criar arquivo .nojekyll para GitHub Pages
  const distPath = resolve(__dirname, 'dist');
  const nojekyllPath = resolve(distPath, '.nojekyll');
  
  if (existsSync(distPath)) {
    writeFileSync(nojekyllPath, '');
    console.log('✅ Arquivo .nojekyll criado');
  }

  // 3. Ajustar index.html para paths relativos se necessário
  const indexPath = resolve(distPath, 'index.html');
  if (existsSync(indexPath)) {
    let indexContent = readFileSync(indexPath, 'utf-8');
    
    // Corrigir paths absolutos para relativos se necessário
    indexContent = indexContent.replace(/href="\/assets\//g, 'href="./assets/');
    indexContent = indexContent.replace(/src="\/assets\//g, 'src="./assets/');
    
    writeFileSync(indexPath, indexContent);
    console.log('✅ Paths relativos ajustados no index.html');
  }

  console.log('🎉 Build para GitHub Pages concluído com sucesso!');
  console.log('📁 Arquivos de build estão em ./dist/');
  console.log('');
  console.log('📋 Próximos passos:');
  console.log('1. Faça commit e push do código');
  console.log('2. Vá para Settings > Pages no GitHub');
  console.log('3. Selecione "GitHub Actions" como source');
  console.log('4. O deploy será automático!');

} catch (error) {
  console.error('❌ Erro durante o build:', error.message);
  process.exit(1);
}