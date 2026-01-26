import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Diretório de testes
  testDir: './tests',
  
  // Timeout para cada teste
  timeout: 30000,
  
  // Executa testes em paralelo
  fullyParallel: true,
  
  // Falha se houver testes com .only
  forbidOnly: !!process.env.CI,
  
  // Número de tentativas em caso de falha
  retries: process.env.CI ? 2 : 0,
  
  // Número de workers (testes em paralelo)
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter para visualizar resultados
  reporter: [
    ['html'],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }]
  ],
  
  // Configurações compartilhadas
  use: {
    // URL base do projeto
    baseURL: 'file://' + process.cwd().replace(/\\/g, '/'),
    
    // Coleta traces em caso de falha
    trace: 'on-first-retry',
    
    // Screenshot em caso de falha
    screenshot: 'only-on-failure',
    
    // Vídeo em caso de falha
    video: 'retain-on-failure',
  },

  // Configuração de projetos (navegadores)
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // Testes em mobile
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
});
