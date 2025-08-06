# 🚀 Guia Rápido: Deploy no GitHub Pages

## ⚡ Setup em 5 Minutos

### 1. Criar Repositório no GitHub
```bash
# Crie um novo repositório no GitHub (público)
# Copie a URL do repositório
```

### 2. Configurar Git Localmente
```bash
git init
git add .
git commit -m "feat: rastreador de estudos completo"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git push -u origin main
```

### 3. Ativar GitHub Pages
1. Vá para o seu repositório no GitHub
2. **Settings** → **Pages**
3. Em **Source**, selecione **"GitHub Actions"**
4. Pronto! ✅

### 4. Aguardar Deploy
- O GitHub Actions vai automaticamente fazer o build
- Acompanhe em **Actions** tab do repositório
- Seu site estará em: `https://SEU_USUARIO.github.io/SEU_REPOSITORIO`

## 🔧 O que Acontece Automaticamente

✅ **Build do Frontend**: Apenas a parte cliente é construída  
✅ **Otimização**: Assets são otimizados para produção  
✅ **Deploy**: Arquivos são publicados no GitHub Pages  
✅ **URL**: Site fica disponível na URL do GitHub Pages  

## 📱 Funcionalidades que Funcionam

- ✅ Todos os botões +30min
- ✅ Navegação entre semanas
- ✅ Copos d'água animados
- ✅ Persistência no localStorage
- ✅ Reset automático mensal
- ✅ Design responsivo

## ⚠️ Limitações no GitHub Pages

- ❌ Não tem backend/servidor
- ❌ Dados ficam apenas no localStorage
- ❌ Não sincroniza entre dispositivos

## 🌟 Vantagens

- 🆓 **Gratuito**: GitHub Pages é gratuito
- ⚡ **Rápido**: Deploy automático em poucos minutos
- 🔗 **Compartilhável**: URL pública para compartilhar
- 📱 **Responsivo**: Funciona em qualquer dispositivo

## 🛠️ Troubleshooting

### Site não carrega?
1. Verifique se o repositório é **público**
2. Aguarde alguns minutos após o primeiro deploy
3. Verifique a aba **Actions** por erros

### Build falhou?
1. Verifique os logs em **Actions**
2. Certifique-se que todos os arquivos foram commitados
3. Tente fazer push novamente

### Mudanças não aparecem?
1. Aguarde o GitHub Actions terminar
2. Limpe o cache do navegador (Ctrl+F5)
3. Aguarde alguns minutos para propagação

## 🎯 Pronto para Usar!

Depois do deploy, você terá uma versão completa do Rastreador de Estudos funcionando online, acessível de qualquer lugar!