# 📊 MarketWatch Dashboard

Dashboard de mercado financeiro em tempo real com cotações de câmbio, índices, criptomoedas e commodities.

## 🚀 Como Usar

1. Abra o arquivo `index.html` no seu navegador
2. Os dados serão atualizados automaticamente a cada 30 segundos
3. Clique no botão "Atualizar" para forçar atualização manual

## 📡 Fontes de Dados

- **Câmbio**: AwesomeAPI (Banco Central do Brasil)
- **Ibovespa**: AwesomeAPI
- **Criptomoedas**: CoinGecko API
- **Commodities**: AwesomeAPI

## 🧪 Sistema de Testes

### Como Executar os Testes

1. Abra o site no navegador
2. Pressione `F12` para abrir o Console do navegador
3. Digite um dos comandos abaixo:

### Comandos Disponíveis

```javascript
// Executa TODOS os testes (recomendado)
rodarTodosOsTestes()

// Testes específicos
testarCambio()        // Testa apenas câmbio
testarCripto()        // Testa apenas criptomoedas
testarIndices()       // Testa apenas índices
```

### O que os Testes Verificam

#### ✅ Estrutura HTML (10 testes)
- Presença de header, logo, botões
- Todos os cards de dados
- Footer e elementos essenciais

#### ✅ APIs (4 testes)
- Conexão com API de Câmbio
- Conexão com API de Ibovespa
- Conexão com API de Criptomoedas
- Conexão com API de Commodities

#### ✅ Funções (10 testes)
- Todas as funções JavaScript
- Formatação de números
- Criação de variações positivas/negativas

#### ✅ Atualização de Dados (7 testes)
- Dólar, Euro, Libra atualizados
- Ibovespa atualizado
- Bitcoin e Ethereum atualizados
- Ouro atualizado
- Data/hora atualizada

#### ✅ Interatividade (2 testes)
- Botão atualizar funcionando
- Efeitos hover nos cards

#### ✅ Responsividade (3 testes)
- Meta viewport configurada
- Media queries no CSS
- Grid responsivo funcionando

#### ✅ Performance (3 testes)
- Tempo de carregamento
- Otimização do DOM
- Contagem de recursos

### Exemplo de Relatório

```
============================================================
📊 RELATÓRIO DE TESTES
============================================================
Total de testes: 39
✅ Passou: 39
❌ Falhou: 0
Taxa de sucesso: 100.0%
============================================================
```

## 📂 Estrutura do Projeto

```
Projeto-site/
│
├── index.html              # Página principal
├── README.md              # Este arquivo
│
├── estilo/
│   └── style.css          # Estilos do dashboard
│
└── scripts/
    ├── market-data.js     # Lógica de atualização de dados
    └── testes.js          # Sistema de testes automatizados
```

## 🎨 Recursos

- ✨ Design moderno com tema escuro
- 📊 Atualização automática a cada 30 segundos
- 🔄 Botão de atualização manual
- 📱 Totalmente responsivo
- 🎯 Indicadores visuais de alta/baixa
- ⚡ Performance otimizada
- 🧪 Sistema completo de testes

## 🛠️ Tecnologias

- HTML5
- CSS3 (Grid, Flexbox, Animations)
- JavaScript (ES6+, Fetch API, Async/Await)
- Font Awesome Icons
- APIs REST públicas

---

Desenvolvido para acompanhamento educacional do mercado financeiro 📈
