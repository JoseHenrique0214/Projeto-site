// MarketWatch - Atualização de Dados em Tempo Real

// Função para formatar números
function formatNumber(num, decimals = 2) {
    return parseFloat(num).toFixed(decimals);
}

// Função para atualizar data e hora
function atualizarDataHora() {
    const agora = new Date();
    const opcoes = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    const dataFormatada = agora.toLocaleDateString('pt-BR', opcoes);
    document.getElementById('dataHora').textContent = dataFormatada;
}

// Função para criar HTML de variação
function criarVariacao(valor) {
    const positivo = valor >= 0;
    const classe = positivo ? 'positiva' : 'negativa';
    const icone = positivo ? 'fa-arrow-up' : 'fa-arrow-down';
    const sinal = positivo ? '+' : '';
    return `<span class="variacao ${classe}">
        <i class="fas ${icone}"></i> ${sinal}${formatNumber(valor)}%
    </span>`;
}

// Atualizar Câmbio (AwesomeAPI)
async function atualizarCambio() {
    try {
        const response = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL');
        const data = await response.json();
        
        // Dólar
        const dolar = data.USDBRL;
        document.querySelector('.cotacao-card:nth-child(1) .valor-principal').textContent = `R$ ${formatNumber(dolar.bid)}`;
        document.querySelector('.cotacao-card:nth-child(1) .variacao').outerHTML = criarVariacao(dolar.pctChange);
        document.querySelector('.cotacao-card:nth-child(1) .cotacao-info').innerHTML = `
            <span>Máx: R$ ${formatNumber(dolar.high)}</span>
            <span>Mín: R$ ${formatNumber(dolar.low)}</span>
        `;
        
        // Euro
        const euro = data.EURBRL;
        document.querySelector('.cotacao-card:nth-child(2) .valor-principal').textContent = `R$ ${formatNumber(euro.bid)}`;
        document.querySelector('.cotacao-card:nth-child(2) .variacao').outerHTML = criarVariacao(euro.pctChange);
        document.querySelector('.cotacao-card:nth-child(2) .cotacao-info').innerHTML = `
            <span>Máx: R$ ${formatNumber(euro.high)}</span>
            <span>Mín: R$ ${formatNumber(euro.low)}</span>
        `;
        
        // Libra
        const libra = data.GBPBRL;
        document.querySelector('.cotacao-card:nth-child(3) .valor-principal').textContent = `R$ ${formatNumber(libra.bid)}`;
        document.querySelector('.cotacao-card:nth-child(3) .variacao').outerHTML = criarVariacao(libra.pctChange);
        document.querySelector('.cotacao-card:nth-child(3) .cotacao-info').innerHTML = `
            <span>Máx: R$ ${formatNumber(libra.high)}</span>
            <span>Mín: R$ ${formatNumber(libra.low)}</span>
        `;
        
        console.log('✅ Câmbio atualizado');
    } catch (error) {
        console.error('❌ Erro ao atualizar câmbio:', error);
    }
}

// Atualizar Índices Brasileiros (B3)
async function atualizarIndicesBrasileiros() {
    try {
        // API do Ibovespa não disponível na AwesomeAPI
        // Mantendo valores de exemplo - em produção, usar API específica da B3
        console.log('⚠️ Índices brasileiros: usando valores de exemplo (API não disponível)');
    } catch (error) {
        console.error('❌ Erro ao atualizar índices brasileiros:', error);
    }
}

// Atualizar Criptomoedas (CoinGecko)
async function atualizarCriptomoedas() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin,cardano,ripple&vs_currencies=usd&include_24hr_change=true');
        const data = await response.json();
        
        // Bitcoin
        if (data.bitcoin) {
            document.querySelector('.cripto-card:nth-child(1) .valor-principal').textContent = `US$ ${formatNumber(data.bitcoin.usd, 0)}`;
            document.querySelector('.cripto-card:nth-child(1) .variacao').outerHTML = criarVariacao(data.bitcoin.usd_24h_change);
        }
        
        // Ethereum
        if (data.ethereum) {
            document.querySelector('.cripto-card:nth-child(2) .valor-principal').textContent = `US$ ${formatNumber(data.ethereum.usd, 0)}`;
            document.querySelector('.cripto-card:nth-child(2) .variacao').outerHTML = criarVariacao(data.ethereum.usd_24h_change);
        }
        
        // Solana
        if (data.solana) {
            document.querySelector('.cripto-card:nth-child(3) .valor-principal').textContent = `US$ ${formatNumber(data.solana.usd)}`;
            document.querySelector('.cripto-card:nth-child(3) .variacao').outerHTML = criarVariacao(data.solana.usd_24h_change);
        }
        
        // BNB
        if (data.binancecoin) {
            document.querySelector('.cripto-card:nth-child(4) .valor-principal').textContent = `US$ ${formatNumber(data.binancecoin.usd)}`;
            document.querySelector('.cripto-card:nth-child(4) .variacao').outerHTML = criarVariacao(data.binancecoin.usd_24h_change);
        }
        
        // Cardano
        if (data.cardano) {
            document.querySelector('.cripto-card:nth-child(5) .valor-principal').textContent = `US$ ${formatNumber(data.cardano.usd)}`;
            document.querySelector('.cripto-card:nth-child(5) .variacao').outerHTML = criarVariacao(data.cardano.usd_24h_change);
        }
        
        // XRP
        if (data.ripple) {
            document.querySelector('.cripto-card:nth-child(6) .valor-principal').textContent = `US$ ${formatNumber(data.ripple.usd)}`;
            document.querySelector('.cripto-card:nth-child(6) .variacao').outerHTML = criarVariacao(data.ripple.usd_24h_change);
        }
        
        console.log('✅ Criptomoedas atualizadas');
    } catch (error) {
        console.error('❌ Erro ao atualizar criptomoedas:', error);
    }
}

// Atualizar Commodities
async function atualizarCommodities() {
    try {
        const response = await fetch('https://economia.awesomeapi.com.br/json/last/XAU-USD');
        const data = await response.json();
        
        // Ouro
        if (data.XAUUSD) {
            const ouro = data.XAUUSD;
            document.querySelector('.commodity-card:nth-child(1) .valor-principal').textContent = `US$ ${formatNumber(ouro.bid, 0)}/oz`;
            document.querySelector('.commodity-card:nth-child(1) .variacao').outerHTML = criarVariacao(ouro.pctChange);
        }
        
        console.log('✅ Commodities atualizadas');
    } catch (error) {
        console.error('❌ Erro ao atualizar commodities:', error);
    }
}

// Função principal para atualizar todos os dados
async function atualizarTodosDados() {
    console.log('🔄 Atualizando dados...');
    
    // Adiciona animação ao botão
    const btnAtualizar = document.querySelector('.btn-atualizar i');
    btnAtualizar.style.animation = 'rotate 1s linear infinite';
    
    atualizarDataHora();
    
    await Promise.all([
        atualizarCambio(),
        atualizarIndicesBrasileiros(),
        atualizarCriptomoedas(),
        atualizarCommodities()
    ]);
    
    // Remove animação do botão
    setTimeout(() => {
        btnAtualizar.style.animation = '';
    }, 1000);
    
    console.log('✅ Todos os dados atualizados!');
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 MarketWatch Dashboard iniciado');
    
    // Atualiza imediatamente
    atualizarTodosDados();
    
    // Atualiza a cada 30 segundos
    setInterval(atualizarTodosDados, 30000);
    
    // Botão de atualizar manual
    document.querySelector('.btn-atualizar').addEventListener('click', atualizarTodosDados);
    
    // Atualiza hora a cada minuto
    setInterval(atualizarDataHora, 60000);
});
