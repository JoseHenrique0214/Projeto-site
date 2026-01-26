# Testes Automatizados - MarketWatch

Testes automatizados usando Playwright para garantir qualidade do sistema de login e dashboard.

## 📦 Instalação

1. **Instale as dependências:**
```bash
npm install
```

2. **Instale os navegadores do Playwright:**
```bash
npx playwright install
```

## 🧪 Executar Testes

### Comandos Básicos:

```bash
# Executa todos os testes
npm test

# Executa testes com interface gráfica
npm run test:headed

# Executa com UI Mode (recomendado para debug)
npm run test:ui

# Executa apenas testes de login
npm run test:login

# Debug de testes
npm run test:debug

# Visualizar relatório após testes
npm run test:report
```

## 📋 Casos de Teste Implementados

### ✅ Estrutura da Página de Login (3 testes)
- Carregamento correto da página
- Presença de todos os campos do formulário
- Exibição de informações de demonstração

### ✅ Validação de Campos (3 testes)
- Submit com campos vazios
- Validação de formato de email
- Validação de senha mínima (4 caracteres)

### ✅ Login com Credenciais Incorretas (3 testes)
- Falha com email não cadastrado
- Falha com senha incorreta
- Limpeza de mensagens de erro

### ✅ Login com Credenciais Corretas (4 testes)
- Login bem-sucedido e redirecionamento
- Salvamento da sessão no localStorage
- Funcionalidade "Lembrar de mim"
- Redirecionamento automático se já logado

### ✅ Funcionalidades da Interface (3 testes)
- Toggle de visibilidade da senha
- Abertura do modal de criar conta
- Fechamento do modal

### ✅ Criar Nova Conta (3 testes)
- Cadastro de novo usuário com sucesso
- Validação de senhas diferentes
- Validação de email inválido

### ✅ Logout (2 testes)
- Logout e redirecionamento
- Proteção de acesso sem login

### ✅ Responsividade (2 testes)
- Visualização em mobile (375x667)
- Visualização em tablet (768x1024)

**Total: 23 testes automatizados**

## 🎯 Navegadores Testados

Os testes são executados em múltiplos navegadores:
- ✅ Chromium (Chrome/Edge)
- ✅ Firefox
- ✅ WebKit (Safari)
- ✅ Mobile Chrome (Pixel 5)
- ✅ Mobile Safari (iPhone 12)

## 📊 Relatórios

Após executar os testes, visualize o relatório HTML:

```bash
npm run test:report
```

O relatório inclui:
- ✅ Testes que passaram
- ❌ Testes que falharam
- 📸 Screenshots de falhas
- 🎥 Vídeos de falhas
- ⏱️ Tempo de execução

## 🐛 Debug de Testes

### Modo UI (Recomendado):
```bash
npm run test:ui
```

### Modo Debug:
```bash
npm run test:debug
```

### Debug de teste específico:
```bash
npx playwright test login.spec.js --debug --grep "Deve fazer login com sucesso"
```

## 📁 Estrutura de Arquivos

```
Projeto-site/
├── tests/
│   └── login.spec.js          # Testes de login
├── test-results/              # Resultados dos testes (gerado)
├── playwright-report/         # Relatório HTML (gerado)
├── package.json               # Dependências e scripts
└── playwright.config.js       # Configuração do Playwright
```

## 🔧 Configuração Personalizada

### Alterar tempo de timeout:
Edite `playwright.config.js`:
```javascript
timeout: 30000, // 30 segundos
```

### Executar em apenas um navegador:
```bash
npx playwright test --project=chromium
```

### Executar testes em paralelo:
```bash
npx playwright test --workers=4
```

## 📝 Criar Novos Testes

1. Crie um novo arquivo em `tests/`:
```javascript
// tests/dashboard.spec.js
import { test, expect } from '@playwright/test';

test('Deve carregar dashboard', async ({ page }) => {
  // Seu teste aqui
});
```

2. Execute:
```bash
npx playwright test dashboard.spec.js
```

## ✨ Melhores Práticas

- ✅ Use `data-testid` para seletores estáveis
- ✅ Limpe estado entre testes (localStorage, cookies)
- ✅ Use `waitForURL` para navegação
- ✅ Capture screenshots em falhas
- ✅ Mantenha testes independentes

## 🚀 Integração Contínua (CI)

Para usar em CI/CD, adicione no seu workflow:

```yaml
- name: Install dependencies
  run: npm ci
  
- name: Install Playwright
  run: npx playwright install --with-deps
  
- name: Run tests
  run: npm test
```

## 📞 Ajuda

Para mais informações sobre Playwright:
- [Documentação Oficial](https://playwright.dev)
- [API Reference](https://playwright.dev/docs/api/class-playwright)
- [Exemplos](https://playwright.dev/docs/intro)
