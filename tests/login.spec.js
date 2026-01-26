import { test, expect } from '@playwright/test';
import path from 'path';

// URL base do projeto (arquivo local)
const LOGIN_URL = 'file:///' + path.resolve('./login.html').replace(/\\/g, '/');
const DASHBOARD_URL = 'file:///' + path.resolve('./index.html').replace(/\\/g, '/');

// Credenciais de teste
const CREDENCIAIS_VALIDAS = {
  email: 'admin@marketwatch.com',
  senha: '1234'
};

const CREDENCIAIS_INVALIDAS = {
  email: 'usuario@errado.com',
  senha: 'senhaerrada'
};

// ==================== SETUP E TEARDOWN ====================

test.beforeEach(async ({ page }) => {
  // Limpa localStorage antes de cada teste
  await page.goto(LOGIN_URL);
  await page.evaluate(() => {
    localStorage.clear();
  });
});

test.afterEach(async ({ page }) => {
  // Limpa localStorage após cada teste
  await page.evaluate(() => {
    localStorage.clear();
  });
});

// ==================== TESTES DE ESTRUTURA ====================

test.describe('Estrutura da Página de Login', () => {
  
  test('Deve carregar a página de login corretamente', async ({ page }) => {
    await page.goto(LOGIN_URL);
    
    // Verifica título
    await expect(page).toHaveTitle(/Login - MarketWatch/);
    
    // Verifica presença de elementos principais
    await expect(page.locator('.logo')).toBeVisible();
    await expect(page.locator('h1')).toContainText('Bem-vindo de volta');
    await expect(page.locator('#loginForm')).toBeVisible();
  });

  test('Deve exibir todos os campos do formulário', async ({ page }) => {
    await page.goto(LOGIN_URL);
    
    // Verifica campos
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#senha')).toBeVisible();
    await expect(page.locator('#lembrar')).toBeVisible();
    await expect(page.locator('.btn-login')).toBeVisible();
  });

  test('Deve exibir informações de demonstração', async ({ page }) => {
    await page.goto(LOGIN_URL);
    
    await expect(page.locator('.demo-info')).toBeVisible();
    await expect(page.locator('.demo-info')).toContainText('admin@marketwatch.com');
    await expect(page.locator('.demo-info')).toContainText('1234');
  });
});

// ==================== TESTES DE VALIDAÇÃO ====================

test.describe('Validação de Campos', () => {

  test('Não deve permitir submit com campos vazios', async ({ page }) => {
    await page.goto(LOGIN_URL);
    
    // Tenta enviar formulário vazio
    await page.locator('.btn-login').click();
    
    // Verifica que ainda está na página de login
    expect(page.url()).toContain('login.html');
  });

  test('Deve validar formato de email', async ({ page }) => {
    await page.goto(LOGIN_URL);
    
    // Preenche email inválido
    await page.locator('#email').fill('emailinvalido');
    await page.locator('#senha').fill('1234');
    await page.locator('.btn-login').click();
    
    // Aguarda e verifica mensagem de erro
    await page.waitForTimeout(500);
    await expect(page.locator('#emailError')).not.toBeEmpty();
  });

  test('Deve validar senha mínima de 4 caracteres', async ({ page }) => {
    await page.goto(LOGIN_URL);
    
    await page.locator('#email').fill('teste@email.com');
    await page.locator('#senha').fill('123'); // Apenas 3 caracteres
    await page.locator('.btn-login').click();
    
    await page.waitForTimeout(500);
    
    const senhaError = await page.locator('#senhaError').textContent();
    expect(senhaError).toContain('no mínimo 4 caracteres');
  });
});

// ==================== TESTES DE LOGIN INCORRETO ====================

test.describe('Login com Credenciais Incorretas', () => {

  test('Deve falhar com email não cadastrado', async ({ page }) => {
    await page.goto(LOGIN_URL);
    
    await page.locator('#email').fill(CREDENCIAIS_INVALIDAS.email);
    await page.locator('#senha').fill(CREDENCIAIS_INVALIDAS.senha);
    await page.locator('.btn-login').click();
    
    // Aguarda processamento
    await page.waitForTimeout(500);
    
    // Verifica mensagem de erro
    const senhaError = await page.locator('#senhaError').textContent();
    expect(senhaError).toContain('incorretos');
    
    // Verifica que ainda está na página de login
    expect(page.url()).toContain('login.html');
  });

  test('Deve falhar com senha incorreta para email válido', async ({ page }) => {
    await page.goto(LOGIN_URL);
    
    await page.locator('#email').fill(CREDENCIAIS_VALIDAS.email);
    await page.locator('#senha').fill('senhaerrada');
    await page.locator('.btn-login').click();
    
    await page.waitForTimeout(500);
    
    const senhaError = await page.locator('#senhaError').textContent();
    expect(senhaError).toContain('incorretos');
  });

  test('Deve limpar mensagens de erro ao corrigir campos', async ({ page }) => {
    await page.goto(LOGIN_URL);
    
    // Gera erro
    await page.locator('#email').fill('emailinvalido');
    await page.locator('#senha').fill('123');
    await page.locator('.btn-login').click();
    await page.waitForTimeout(500);
    
    // Corrige campos
    await page.locator('#email').clear();
    await page.locator('#email').fill(CREDENCIAIS_VALIDAS.email);
    await page.locator('#senha').clear();
    await page.locator('#senha').fill(CREDENCIAIS_VALIDAS.senha);
    
    // As mensagens de erro devem estar vazias ao resubmeter
    await page.locator('.btn-login').click();
    await page.waitForTimeout(1000);
    
    // Deve ter redirecionado
    expect(page.url()).toContain('index.html');
  });
});

// ==================== TESTES DE LOGIN CORRETO ====================

test.describe('Login com Credenciais Corretas', () => {

  test('Deve fazer login com sucesso e redirecionar para dashboard', async ({ page }) => {
    await page.goto(LOGIN_URL);
    
    // Preenche credenciais válidas
    await page.locator('#email').fill(CREDENCIAIS_VALIDAS.email);
    await page.locator('#senha').fill(CREDENCIAIS_VALIDAS.senha);
    await page.locator('.btn-login').click();
    
    // Aguarda redirecionamento
    await page.waitForURL(/index\.html/, { timeout: 3000 });
    
    // Verifica que está no dashboard
    expect(page.url()).toContain('index.html');
    
    // Verifica elementos do dashboard
    await expect(page.locator('.header')).toBeVisible();
    await expect(page.locator('.logo')).toContainText('MarketWatch');
  });

  test('Deve salvar sessão no localStorage', async ({ page }) => {
    await page.goto(LOGIN_URL);
    
    await page.locator('#email').fill(CREDENCIAIS_VALIDAS.email);
    await page.locator('#senha').fill(CREDENCIAIS_VALIDAS.senha);
    await page.locator('.btn-login').click();
    
    await page.waitForURL(/index\.html/, { timeout: 3000 });
    
    // Verifica localStorage
    const authData = await page.evaluate(() => {
      return localStorage.getItem('marketwatch_auth');
    });
    
    expect(authData).toBeTruthy();
    
    const usuario = JSON.parse(authData);
    expect(usuario.email).toBe(CREDENCIAIS_VALIDAS.email);
    expect(usuario.nome).toBe('Administrador');
  });

  test('Deve marcar "Lembrar de mim" corretamente', async ({ page }) => {
    await page.goto(LOGIN_URL);
    
    await page.locator('#email').fill(CREDENCIAIS_VALIDAS.email);
    await page.locator('#senha').fill(CREDENCIAIS_VALIDAS.senha);
    await page.locator('#lembrar').check();
    await page.locator('.btn-login').click();
    
    await page.waitForURL(/index\.html/, { timeout: 10000 });
    
    const authData = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('marketwatch_auth'));
    });
    
    expect(authData.lembrar).toBe(true);
  });

  test('Deve redirecionar automaticamente se já estiver logado', async ({ page }) => {
    // Faz login primeiro
    await page.goto(LOGIN_URL);
    await page.locator('#email').fill(CREDENCIAIS_VALIDAS.email);
    await page.locator('#senha').fill(CREDENCIAIS_VALIDAS.senha);
    await page.locator('.btn-login').click();
    await page.waitForURL(/index\.html/, { timeout: 3000 });
    
    // Tenta voltar para página de login
    await page.goto(LOGIN_URL);
    
    // Deve redirecionar automaticamente para dashboard
    await page.waitForURL(/index\.html/, { timeout: 3000 });
    expect(page.url()).toContain('index.html');
  });
});

// ==================== TESTES DE FUNCIONALIDADES ====================

test.describe('Funcionalidades da Interface', () => {

  test('Deve alternar visibilidade da senha', async ({ page }) => {
    await page.goto(LOGIN_URL);
    
    const senhaInput = page.locator('#senha');
    const toggleButton = page.locator('#togglePassword');
    
    // Verifica que começa como password
    await expect(senhaInput).toHaveAttribute('type', 'password');
    
    // Clica para mostrar
    await toggleButton.click();
    await expect(senhaInput).toHaveAttribute('type', 'text');
    
    // Clica para ocultar
    await toggleButton.click();
    await expect(senhaInput).toHaveAttribute('type', 'password');
  });

  test('Deve abrir modal de criar conta', async ({ page }) => {
    await page.goto(LOGIN_URL);
    
    const modal = page.locator('#criarContaModal');
    
    // Modal deve estar oculto inicialmente
    await expect(modal).not.toHaveClass(/active/);
    
    // Clica em "Criar conta"
    await page.locator('#criarContaLink').click();
    
    // Modal deve estar visível
    await expect(modal).toHaveClass(/active/);
    await expect(page.locator('#cadastroForm')).toBeVisible();
  });

  test('Deve fechar modal ao clicar no X', async ({ page }) => {
    await page.goto(LOGIN_URL);
    
    // Abre modal
    await page.locator('#criarContaLink').click();
    const modal = page.locator('#criarContaModal');
    await expect(modal).toHaveClass(/active/);
    
    // Fecha modal
    await page.locator('#closeModal').click({ force: true });
    await expect(modal).not.toHaveClass(/active/);
  });
});

// ==================== TESTES DE CADASTRO ====================

test.describe('Criar Nova Conta', () => {

  test('Deve cadastrar novo usuário com sucesso', async ({ page }) => {
    await page.goto(LOGIN_URL);
    
    // Abre modal
    await page.locator('#criarContaLink').click();
    
    // Preenche formulário
    await page.locator('#novoNome').fill('Teste Usuário');
    await page.locator('#novoEmail').fill('teste@novousuario.com');
    await page.locator('#novaSenha').fill('senha123');
    await page.locator('#confirmarSenha').fill('senha123');
    
    // Intercepta alert
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Conta criada com sucesso');
      await dialog.accept();
    });
    
    // Submete formulário
    await page.locator('.btn-cadastrar').click({ force: true });
    
    // Aguarda processamento
    await page.waitForTimeout(500);
    
    // Verifica que o email foi preenchido no login
    const emailValue = await page.locator('#email').inputValue();
    expect(emailValue).toBe('teste@novousuario.com');
  });

  test('Não deve permitir cadastro com senhas diferentes', async ({ page }) => {
    await page.goto(LOGIN_URL);
    
    await page.locator('#criarContaLink').click();
    
    await page.locator('#novoNome').fill('Teste');
    await page.locator('#novoEmail').fill('teste@email.com');
    await page.locator('#novaSenha').fill('senha123');
    await page.locator('#confirmarSenha').fill('senha456');
    
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('não coincidem');
      await dialog.accept();
    });
    
    await page.locator('.btn-cadastrar').click({ force: true });
    await page.waitForTimeout(500);
  });

  test('Não deve permitir cadastro com email inválido', async ({ page }) => {
    await page.goto(LOGIN_URL);
    
    await page.locator('#criarContaLink').click();
    
    await page.locator('#novoNome').fill('Teste');
    await page.locator('#novoEmail').fill('emailinvalido');
    await page.locator('#novaSenha').fill('senha123');
    await page.locator('#confirmarSenha').fill('senha123');
    
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('email válido');
      await dialog.accept();
    });
    
    await page.locator('.btn-cadastrar').click({ force: true });
    await page.waitForTimeout(500);
  });
});

// ==================== TESTES DE LOGOUT ====================

test.describe('Logout', () => {

  test('Deve fazer logout e redirecionar para login', async ({ page }) => {
    // Faz login primeiro
    await page.goto(LOGIN_URL);
    await page.locator('#email').fill(CREDENCIAIS_VALIDAS.email);
    await page.locator('#senha').fill(CREDENCIAIS_VALIDAS.senha);
    await page.locator('.btn-login').click();
    await page.waitForURL(/index\.html/, { timeout: 3000 });
    
    // Clica em logout
    await page.locator('.btn-logout').click();
    
    // Deve redirecionar para login
    await page.waitForURL(/login\.html/, { timeout: 3000 });
    expect(page.url()).toContain('login.html');
    
    // Verifica que localStorage foi limpo
    const authData = await page.evaluate(() => {
      return localStorage.getItem('marketwatch_auth');
    });
    expect(authData).toBeNull();
  });

  test('Não deve acessar dashboard sem estar logado', async ({ page }) => {
    // Tenta acessar dashboard diretamente
    await page.goto(DASHBOARD_URL);
    
    // Deve redirecionar para login
    await page.waitForURL(/login\.html/, { timeout: 3000 });
    expect(page.url()).toContain('login.html');
  });
});

// ==================== TESTES DE RESPONSIVIDADE ====================

test.describe('Responsividade', () => {

  test('Deve exibir corretamente em mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(LOGIN_URL);
    
    await expect(page.locator('.login-box')).toBeVisible();
    await expect(page.locator('#loginForm')).toBeVisible();
  });

  test('Deve exibir corretamente em tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(LOGIN_URL);
    
    await expect(page.locator('.login-box')).toBeVisible();
    await expect(page.locator('#loginForm')).toBeVisible();
  });
});
