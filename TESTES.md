# Instalação e Execução dos Testes Playwright

## 🚀 Guia Rápido de Instalação

### 1. Instale o Node.js
Se ainda não tiver, baixe e instale o Node.js:
- https://nodejs.org/ (versão LTS recomendada)

### 2. Abra o Terminal no VS Code
- Pressione `Ctrl + '` (acento grave)
- Ou vá em: Terminal → New Terminal

### 3. Instale as Dependências

```bash
npm install
```

### 4. Instale os Navegadores do Playwright

```bash
npx playwright install
```

## ▶️ Como Executar os Testes

### Opção 1: Modo Headless (Sem Interface)
```bash
npm test
```

### Opção 2: Modo Headed (Com Interface - Ver o navegador)
```bash
npm run test:headed
```

### Opção 3: UI Mode (Melhor para Ver e Depurar)
```bash
npm run test:ui
```

### Opção 4: Executar Apenas Testes de Login
```bash
npm run test:login
```

### Opção 5: Ver Relatório
```bash
npm run test:report
```

## 📊 O que os Testes Verificam

### ✅ **23 Casos de Teste Implementados:**

1. **Estrutura da Página** (3 testes)
   - Carregamento correto
   - Campos presentes
   - Informações de demo

2. **Validação de Entrada** (3 testes)
   - Campos vazios
   - Email inválido
   - Senha muito curta

3. **Login Incorreto** (3 testes)
   - Email não cadastrado
   - Senha errada
   - Mensagens de erro

4. **Login Correto** (4 testes)
   - Login bem-sucedido
   - Salvar no localStorage
   - Lembrar de mim
   - Auto-redirecionamento

5. **Interface** (3 testes)
   - Mostrar/ocultar senha
   - Abrir modal
   - Fechar modal

6. **Cadastro** (3 testes)
   - Criar conta
   - Senhas diferentes
   - Email inválido

7. **Logout** (2 testes)
   - Fazer logout
   - Proteção de página

8. **Responsividade** (2 testes)
   - Mobile
   - Tablet

## 📝 Exemplo de Saída

```
Running 23 tests using 5 workers

  ✓ login.spec.js:20:3 › Estrutura da Página de Login › Deve carregar a página de login corretamente (1.2s)
  ✓ login.spec.js:29:3 › Estrutura da Página de Login › Deve exibir todos os campos do formulário (856ms)
  ✓ login.spec.js:40:3 › Estrutura da Página de Login › Deve exibir informações de demonstração (742ms)
  ✓ login.spec.js:52:3 › Validação de Campos › Não deve permitir submit com campos vazios (1.1s)
  ✓ login.spec.js:62:3 › Validação de Campos › Deve validar formato de email (987ms)
  ...

  23 passed (45.2s)

To open last HTML report run:
  npx playwright show-report
```

## 🎯 Navegadores Testados

Cada teste roda em 5 navegadores automaticamente:
- Chrome (Desktop)
- Firefox (Desktop)
- Safari (Desktop)
- Chrome Mobile (Pixel 5)
- Safari Mobile (iPhone 12)

**Total: 23 testes × 5 navegadores = 115 execuções!**

## 🐛 Depuração

Se um teste falhar, você verá:
- 📸 Screenshot da tela
- 🎥 Vídeo da execução
- 📝 Trace detalhado
- ⚠️ Mensagem de erro

## ⚡ Comandos Úteis

```bash
# Executar teste específico
npx playwright test --grep "Login com Credenciais Corretas"

# Executar em um navegador específico
npx playwright test --project=chromium

# Debug interativo
npm run test:debug

# Gerar trace para análise
npx playwright test --trace on
```

## ❓ Solução de Problemas

### Erro: "playwright is not recognized"
```bash
npm install
npx playwright install
```

### Erro: "Cannot find module"
```bash
npm clean-install
```

### Erro: Navegadores não instalados
```bash
npx playwright install chromium firefox webkit
```

## 📚 Documentação Completa

Veja [tests/README.md](tests/README.md) para documentação detalhada.
