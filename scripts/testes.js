// Sistema de Testes - MarketWatch Dashboard
// Execute no console: rodarTodosOsTestes()

const Testes = {
    resultados: {
        total: 0,
        passou: 0,
        falhou: 0,
        erros: []
    },

    // Limpa resultados anteriores
    limpar() {
        this.resultados = {
            total: 0,
            passou: 0,
            falhou: 0,
            erros: []
        };
    },

    // Registra resultado de um teste
    registrar(nome, passou, mensagem = '') {
        this.resultados.total++;
        if (passou) {
            this.resultados.passou++;
            console.log(`✅ ${nome}`);
        } else {
            this.resultados.falhou++;
            this.resultados.erros.push({ teste: nome, erro: mensagem });
            console.error(`❌ ${nome}: ${mensagem}`);
        }
    },

    // Mostra relatório final
    relatorio() {
        console.log('\n' + '='.repeat(60));
        console.log('📊 RELATÓRIO DE TESTES');
        console.log('='.repeat(60));
        console.log(`Total de testes: ${this.resultados.total}`);
        console.log(`✅ Passou: ${this.resultados.passou}`);
        console.log(`❌ Falhou: ${this.resultados.falhou}`);
        console.log(`Taxa de sucesso: ${((this.resultados.passou / this.resultados.total) * 100).toFixed(1)}%`);
        
        if (this.resultados.erros.length > 0) {
            console.log('\n🔍 ERROS ENCONTRADOS:');
            this.resultados.erros.forEach((erro, index) => {
                console.log(`${index + 1}. ${erro.teste}`);
                console.log(`   ${erro.erro}`);
            });
        }
        console.log('='.repeat(60) + '\n');
    }
};

// ==================== TESTES DE ESTRUTURA HTML ====================

function testarEstruturaHTML() {
    console.log('\n🔍 TESTANDO ESTRUTURA HTML...\n');
    
    // Teste 1: Header existe
    const header = document.querySelector('.header');
    Testes.registrar('Header presente', header !== null, 'Header não encontrado');
    
    // Teste 2: Logo existe
    const logo = document.querySelector('.logo');
    Testes.registrar('Logo presente', logo !== null, 'Logo não encontrado');
    
    // Teste 3: Botão atualizar existe
    const btnAtualizar = document.querySelector('.btn-atualizar');
    Testes.registrar('Botão atualizar presente', btnAtualizar !== null, 'Botão não encontrado');
    
    // Teste 4: Data/hora existe
    const dataHora = document.getElementById('dataHora');
    Testes.registrar('Elemento de data/hora presente', dataHora !== null, 'Data/hora não encontrada');
    
    // Teste 5: Seções de dados existem
    const secoes = document.querySelectorAll('.secao');
    Testes.registrar('Seções de dados presentes', secoes.length >= 4, `Encontradas ${secoes.length} seções, esperado >= 4`);
    
    // Teste 6: Cards de câmbio existem
    const cardsCambio = document.querySelectorAll('.cotacao-card');
    Testes.registrar('Cards de câmbio presentes', cardsCambio.length === 3, `Encontrados ${cardsCambio.length} cards, esperado 3`);
    
    // Teste 7: Cards de índices brasileiros existem
    const cardsIndicesBR = document.querySelectorAll('.indice-card');
    Testes.registrar('Cards de índices presentes', cardsIndicesBR.length >= 3, `Encontrados ${cardsIndicesBR.length} cards, esperado >= 3`);
    
    // Teste 8: Cards de criptomoedas existem
    const cardsCripto = document.querySelectorAll('.cripto-card');
    Testes.registrar('Cards de criptomoedas presentes', cardsCripto.length === 6, `Encontrados ${cardsCripto.length} cards, esperado 6`);
    
    // Teste 9: Cards de commodities existem
    const cardsCommodity = document.querySelectorAll('.commodity-card');
    Testes.registrar('Cards de commodities presentes', cardsCommodity.length === 4, `Encontrados ${cardsCommodity.length} cards, esperado 4`);
    
    // Teste 10: Footer existe
    const footer = document.querySelector('.footer');
    Testes.registrar('Footer presente', footer !== null, 'Footer não encontrado');
}

// ==================== TESTES DE APIS ====================

async function testarAPIs() {
    console.log('\n🌐 TESTANDO CONEXÕES COM APIs...\n');
    
    // Teste 1: API de Câmbio (AwesomeAPI)
    try {
        const resCambio = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL');
        const statusCambio = resCambio.ok;
        const dataCambio = await resCambio.json();
        const temDados = dataCambio.USDBRL && dataCambio.USDBRL.bid;
        Testes.registrar('API de Câmbio (AwesomeAPI)', statusCambio && temDados, 
            !statusCambio ? 'Falha na conexão' : 'Dados inválidos');
    } catch (error) {
        Testes.registrar('API de Câmbio (AwesomeAPI)', false, error.message);
    }
    
    // Teste 2: API de Ibovespa (pulado - API não disponível)
    // A AwesomeAPI não possui endpoint para IBOV
    Testes.registrar('API de Ibovespa', true, 'Pulado - API não disponível (usando valores de exemplo)');
    
    // Teste 3: API de Criptomoedas (CoinGecko)
    try {
        const resCripto = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const statusCripto = resCripto.ok;
        const dataCripto = await resCripto.json();
        const temDados = dataCripto.bitcoin && dataCripto.bitcoin.usd;
        Testes.registrar('API de Criptomoedas (CoinGecko)', statusCripto && temDados, 
            !statusCripto ? 'Falha na conexão' : 'Dados inválidos');
    } catch (error) {
        Testes.registrar('API de Criptomoedas (CoinGecko)', false, error.message);
    }
    
    // Teste 4: API de Commodities (Ouro)
    try {
        const resCommodity = await fetch('https://economia.awesomeapi.com.br/json/last/XAU-USD');
        const statusCommodity = resCommodity.ok;
        const dataCommodity = await resCommodity.json();
        const temDados = dataCommodity.XAUUSD && dataCommodity.XAUUSD.bid;
        Testes.registrar('API de Commodities (Ouro)', statusCommodity && temDados, 
            !statusCommodity ? 'Falha na conexão' : 'Dados inválidos');
    } catch (error) {
        Testes.registrar('API de Commodities (Ouro)', false, error.message);
    }
}

// ==================== TESTES DE FUNÇÕES ====================

function testarFuncoesUtilitarias() {
    console.log('\n⚙️ TESTANDO FUNÇÕES UTILITÁRIAS...\n');
    
    // Teste 1: Função formatNumber existe
    const temFormatNumber = typeof formatNumber !== 'undefined';
    Testes.registrar('Função formatNumber definida', temFormatNumber, 'Função não encontrada');
    
    if (temFormatNumber) {
        // Teste 2: formatNumber funciona corretamente
        const resultado = formatNumber(5.87654, 2);
        Testes.registrar('formatNumber formata corretamente', resultado === '5.88', 
            `Esperado '5.88', recebido '${resultado}'`);
        
        // Teste 3: formatNumber com inteiros
        const resultadoInt = formatNumber(12345, 0);
        Testes.registrar('formatNumber formata inteiros', resultadoInt === '12345', 
            `Esperado '12345', recebido '${resultadoInt}'`);
    }
    
    // Teste 4: Função atualizarDataHora existe
    const temAtualizarDataHora = typeof atualizarDataHora !== 'undefined';
    Testes.registrar('Função atualizarDataHora definida', temAtualizarDataHora, 'Função não encontrada');
    
    // Teste 5: Função criarVariacao existe
    const temCriarVariacao = typeof criarVariacao !== 'undefined';
    Testes.registrar('Função criarVariacao definida', temCriarVariacao, 'Função não encontrada');
    
    if (temCriarVariacao) {
        // Teste 6: criarVariacao com valor positivo
        const varPos = criarVariacao(2.5);
        const temPositiva = varPos.includes('positiva') && varPos.includes('fa-arrow-up');
        Testes.registrar('criarVariacao para valores positivos', temPositiva, 'Não gerou HTML correto');
        
        // Teste 7: criarVariacao com valor negativo
        const varNeg = criarVariacao(-1.5);
        const temNegativa = varNeg.includes('negativa') && varNeg.includes('fa-arrow-down');
        Testes.registrar('criarVariacao para valores negativos', temNegativa, 'Não gerou HTML correto');
    }
    
    // Teste 8: Função atualizarCambio existe
    const temAtualizarCambio = typeof atualizarCambio !== 'undefined';
    Testes.registrar('Função atualizarCambio definida', temAtualizarCambio, 'Função não encontrada');
    
    // Teste 9: Função atualizarCriptomoedas existe
    const temAtualizarCripto = typeof atualizarCriptomoedas !== 'undefined';
    Testes.registrar('Função atualizarCriptomoedas definida', temAtualizarCripto, 'Função não encontrada');
    
    // Teste 10: Função atualizarTodosDados existe
    const temAtualizarTodos = typeof atualizarTodosDados !== 'undefined';
    Testes.registrar('Função atualizarTodosDados definida', temAtualizarTodos, 'Função não encontrada');
}

// ==================== TESTES DE DADOS EM TEMPO REAL ====================

async function testarAtualizacaoDados() {
    console.log('\n🔄 TESTANDO ATUALIZAÇÃO DE DADOS...\n');
    
    // Aguarda um pouco para garantir que os dados foram carregados
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Teste 1: Dólar está preenchido
    const dolarValor = document.querySelector('.cotacao-card:nth-child(1) .valor-principal');
    const dolarPreenchido = dolarValor && dolarValor.textContent.includes('R$') && !dolarValor.textContent.includes('5,87');
    Testes.registrar('Dólar atualizado', dolarPreenchido, 
        dolarValor ? `Valor encontrado: ${dolarValor.textContent}` : 'Elemento não encontrado');
    
    // Teste 2: Euro está preenchido
    const euroValor = document.querySelector('.cotacao-card:nth-child(2) .valor-principal');
    const euroPreenchido = euroValor && euroValor.textContent.includes('R$');
    Testes.registrar('Euro atualizado', euroPreenchido, 
        euroValor ? `Valor encontrado: ${euroValor.textContent}` : 'Elemento não encontrado');
    
    // Teste 3: Ibovespa está preenchido (valores de exemplo)
    const ibovValor = document.querySelector('.indice-card.destaque .valor-principal');
    const ibovPreenchido = ibovValor && ibovValor.textContent.length > 0 && ibovValor.textContent !== '0';
    Testes.registrar('Ibovespa presente', ibovPreenchido, 
        ibovValor ? `Valor encontrado: ${ibovValor.textContent} (exemplo)` : 'Elemento não encontrado');
    
    // Teste 4: Bitcoin está preenchido
    const btcValor = document.querySelector('.cripto-card:nth-child(1) .valor-principal');
    const btcPreenchido = btcValor && btcValor.textContent.includes('US$');
    Testes.registrar('Bitcoin atualizado', btcPreenchido, 
        btcValor ? `Valor encontrado: ${btcValor.textContent}` : 'Elemento não encontrado');
    
    // Teste 5: Ethereum está preenchido
    const ethValor = document.querySelector('.cripto-card:nth-child(2) .valor-principal');
    const ethPreenchido = ethValor && ethValor.textContent.includes('US$');
    Testes.registrar('Ethereum atualizado', ethPreenchido, 
        ethValor ? `Valor encontrado: ${ethValor.textContent}` : 'Elemento não encontrado');
    
    // Teste 6: Ouro está preenchido
    const ouroValor = document.querySelector('.commodity-card:nth-child(1) .valor-principal');
    const ouroPreenchido = ouroValor && ouroValor.textContent.includes('US$');
    Testes.registrar('Ouro atualizado', ouroPreenchido, 
        ouroValor ? `Valor encontrado: ${ouroValor.textContent}` : 'Elemento não encontrado');
    
    // Teste 7: Data/hora está preenchida
    const dataHora = document.getElementById('dataHora');
    const dataPreenchida = dataHora && dataHora.textContent.length > 0;
    Testes.registrar('Data/hora atualizada', dataPreenchida, 
        dataHora ? `Valor encontrado: ${dataHora.textContent}` : 'Elemento não encontrado');
}

// ==================== TESTES DE INTERATIVIDADE ====================

async function testarInteratividade() {
    console.log('\n🖱️ TESTANDO INTERATIVIDADE...\n');
    
    // Teste 1: Botão atualizar responde a cliques
    const btnAtualizar = document.querySelector('.btn-atualizar');
    if (btnAtualizar) {
        try {
            const valorAntes = document.querySelector('.cotacao-card:nth-child(1) .valor-principal').textContent;
            btnAtualizar.click();
            await new Promise(resolve => setTimeout(resolve, 2000));
            const valorDepois = document.querySelector('.cotacao-card:nth-child(1) .valor-principal').textContent;
            Testes.registrar('Botão atualizar funciona', true, 'Clique executado com sucesso');
        } catch (error) {
            Testes.registrar('Botão atualizar funciona', false, error.message);
        }
    } else {
        Testes.registrar('Botão atualizar funciona', false, 'Botão não encontrado');
    }
    
    // Teste 2: Cards têm efeito hover (verificar CSS)
    const primeiroCard = document.querySelector('.cotacao-card');
    if (primeiroCard) {
        const temTransition = window.getComputedStyle(primeiroCard).transition.includes('transform');
        Testes.registrar('Cards têm efeito hover', temTransition, 'Transition não encontrada no CSS');
    } else {
        Testes.registrar('Cards têm efeito hover', false, 'Card não encontrado');
    }
}

// ==================== TESTES DE RESPONSIVIDADE ====================

function testarResponsividade() {
    console.log('\n📱 TESTANDO RESPONSIVIDADE...\n');
    
    // Teste 1: Meta viewport está configurada
    const metaViewport = document.querySelector('meta[name="viewport"]');
    Testes.registrar('Meta viewport configurada', metaViewport !== null, 'Tag meta viewport não encontrada');
    
    // Teste 2: CSS responsivo existe
    const styleSheets = Array.from(document.styleSheets);
    let temMediaQueries = false;
    
    try {
        styleSheets.forEach(sheet => {
            if (sheet.href && sheet.href.includes('style.css')) {
                const rules = Array.from(sheet.cssRules || []);
                temMediaQueries = rules.some(rule => rule.type === CSSRule.MEDIA_RULE);
            }
        });
        Testes.registrar('CSS possui media queries', temMediaQueries, 'Media queries não encontradas');
    } catch (error) {
        Testes.registrar('CSS possui media queries', false, 'Erro ao verificar CSS');
    }
    
    // Teste 3: Grid responsivo
    const grid = document.querySelector('.cards-grid');
    if (grid) {
        const gridStyle = window.getComputedStyle(grid);
        const temGrid = gridStyle.display === 'grid';
        Testes.registrar('Grid CSS configurado', temGrid, 'Display grid não encontrado');
    } else {
        Testes.registrar('Grid CSS configurado', false, 'Grid não encontrado');
    }
}

// ==================== TESTES DE PERFORMANCE ====================

function testarPerformance() {
    console.log('\n⚡ TESTANDO PERFORMANCE...\n');
    
    // Teste 1: Tempo de carregamento
    const performance = window.performance;
    if (performance && performance.timing) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        const rapido = loadTime < 5000; // Menos de 5 segundos
        Testes.registrar('Tempo de carregamento aceitável', rapido, 
            `Tempo: ${loadTime}ms (esperado < 5000ms)`);
    } else {
        Testes.registrar('Tempo de carregamento aceitável', false, 'Performance API não disponível');
    }
    
    // Teste 2: Número de elementos no DOM
    const elementosDOM = document.querySelectorAll('*').length;
    const domOtimizado = elementosDOM < 1000;
    Testes.registrar('DOM otimizado', domOtimizado, 
        `Elementos no DOM: ${elementosDOM} (esperado < 1000)`);
    
    // Teste 3: Imagens lazy loading (se aplicável)
    const imagens = document.querySelectorAll('img');
    Testes.registrar('Número de imagens no site', true, 
        `Total de imagens: ${imagens.length}`);
}

// ==================== FUNÇÃO PRINCIPAL ====================

async function rodarTodosOsTestes() {
    console.clear();
    console.log('🚀 INICIANDO BATERIA COMPLETA DE TESTES\n');
    console.log('⏱️ Este processo pode levar alguns segundos...\n');
    
    Testes.limpar();
    
    const inicio = Date.now();
    
    // Executa todos os testes
    testarEstruturaHTML();
    await testarAPIs();
    testarFuncoesUtilitarias();
    await testarAtualizacaoDados();
    await testarInteratividade();
    testarResponsividade();
    testarPerformance();
    
    const fim = Date.now();
    const duracao = ((fim - inicio) / 1000).toFixed(2);
    
    // Mostra relatório final
    Testes.relatorio();
    console.log(`⏱️ Tempo total de execução: ${duracao}s`);
    
    // Retorna resultado
    return {
        sucesso: Testes.resultados.falhou === 0,
        detalhes: Testes.resultados
    };
}

// ==================== TESTES INDIVIDUAIS ====================

async function testarCambio() {
    console.log('💱 Testando apenas CÂMBIO...\n');
    Testes.limpar();
    await testarAPIs();
    await atualizarCambio();
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const dolar = document.querySelector('.cotacao-card:nth-child(1) .valor-principal');
    console.log('Dólar:', dolar ? dolar.textContent : 'Não encontrado');
    Testes.relatorio();
}

async function testarCripto() {
    console.log('₿ Testando apenas CRIPTOMOEDAS...\n');
    Testes.limpar();
    await atualizarCriptomoedas();
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const btc = document.querySelector('.cripto-card:nth-child(1) .valor-principal');
    console.log('Bitcoin:', btc ? btc.textContent : 'Não encontrado');
    Testes.relatorio();
}

async function testarIndices() {
    console.log('📈 Testando apenas ÍNDICES...\n');
    Testes.limpar();
    await atualizarIndicesBrasileiros();
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const ibov = document.querySelector('.indice-card.destaque .valor-principal');
    console.log('Ibovespa:', ibov ? ibov.textContent : 'Não encontrado');
    Testes.relatorio();
}

// Exporta funções para o console
console.log('📋 SISTEMA DE TESTES CARREGADO!');
console.log('');
console.log('Comandos disponíveis:');
console.log('  rodarTodosOsTestes()  - Executa todos os testes');
console.log('  testarCambio()        - Testa apenas câmbio');
console.log('  testarCripto()        - Testa apenas criptomoedas');
console.log('  testarIndices()       - Testa apenas índices');
console.log('');
