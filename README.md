# Rastreador de Estudos

Um aplicativo web para rastrear seu progresso de estudos diário, semanal e mensal com visualizações intuitivas de "copo d'água" e gerenciamento automático de semanas.

## 🚀 Funcionalidades

- **Metas Inteligentes**: 6 horas/dia, 12 horas/semana, 48 horas/mês
- **Visualização de Copos**: Gráficos que enchem proporcionalmente ao progresso
- **Botões +30min**: Para cada dia da semana
- **Navegação entre Semanas**: Acesse semana atual e anterior
- **Histórico Automático**: Mantém registro das últimas 2 semanas
- **Reset Mensal**: Zera automaticamente no início de cada mês
- **Interface Responsiva**: Layout em 3 colunas adaptável

## 📋 Como Usar

1. **Adicionar Tempo**: Clique nos botões "+30min" para cada dia
2. **Navegar Semanas**: Use os botões azul (atual) e cinza (anterior) no cronograma
3. **Criar Nova Semana**: Use "Próxima Semana" ou "Nova Semana" 
4. **Resetar**: Use "Resetar" para limpar todos os dados

## 🌐 Deploy no GitHub Pages

### Passo 1: Preparar o Repositório
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git push -u origin main
```

### Passo 2: Configurar GitHub Pages
1. Vá para **Settings** → **Pages** no seu repositório
2. Em **Source**, selecione **GitHub Actions**
3. O arquivo `.github/workflows/deploy.yml` já está configurado

### Passo 3: Ajustar Build para GitHub Pages
Como este é um projeto full-stack, você precisa fazer algumas modificações manuais:

#### A. Modificar `vite.config.ts`:
```typescript
// Adicione estas linhas na configuração build:
build: {
  outDir: process.env.VITE_BUILD_FOR_GITHUB_PAGES 
    ? path.resolve(import.meta.dirname, "dist")
    : path.resolve(import.meta.dirname, "dist/public"),
  emptyOutDir: true,
},
base: process.env.VITE_BUILD_FOR_GITHUB_PAGES ? "./" : "/",
```

#### B. Criar Build Script no `package.json`:
```json
"scripts": {
  "build:gh-pages": "VITE_BUILD_FOR_GITHUB_PAGES=true vite build"
}
```

#### C. Atualizar `.github/workflows/deploy.yml`:
```yaml
- name: Build project
  run: npm run build:gh-pages
```

### Passo 4: Deploy
1. Faça push das mudanças
2. O GitHub Actions irá automaticamente fazer o build e deploy
3. Acesse seu site em: `https://SEU_USUARIO.github.io/SEU_REPOSITORIO`

## 🔧 Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 📱 Funcionalidades Detalhadas

### Controles de Semana
- **Próxima Semana**: Avança para próxima semana e salva a atual no histórico
- **Nova Semana**: Cria uma nova semana (mesmo comportamento)
- **Resetar**: Limpa todos os dados e volta para Semana 1

### Navegação
- **Semana Atual** (azul): Permite adicionar tempo
- **Semana Anterior** (cinza): Permite adicionar tempo retroativamente
- Botões ficam desabilitados quando já estão na semana correspondente

### Visualizações
- **Copos Diários**: Mostram progresso individual de cada dia (meta: 6h)
- **Copo Semanal**: Progresso da semana atual (meta: 12h)
- **Progresso Mensal**: Total acumulado no mês (meta: 48h)

### Persistência
- Dados salvos no localStorage
- Reset automático mensal
- Histórico das últimas 2 semanas

## 🎨 Tecnologias

- **Frontend**: React, TypeScript, Tailwind CSS
- **Build**: Vite
- **UI Components**: Radix UI, shadcn/ui
- **Ícones**: Lucide React
- **Deployment**: GitHub Pages + GitHub Actions

## 📄 Estrutura do Projeto

```
├── client/src/
│   ├── components/     # Componentes UI reutilizáveis
│   ├── hooks/         # Hook personalizado de rastreamento
│   ├── pages/         # Página principal do app
│   └── lib/           # Utilitários
├── .github/workflows/ # Configuração de CI/CD
└── README.md         # Este arquivo
```