# Agentes Disponíveis

Este documento descreve os agentes especializados disponíveis para trabalhar neste repositório.

## Tipos de Agentes

### 1. Agente de Exploração (explore)
**Especialidade:** Exploração de código e resposta a perguntas sobre o código

**Características:**
- Rápido e especializado em explorar bases de código
- Pode encontrar arquivos por padrões (ex: "src/components/**/*.tsx")
- Pode buscar código por palavras-chave (ex: "API endpoints")
- Responde perguntas sobre o código (ex: "como funcionam os endpoints da API?", "o que esta base de código faz?", "onde está a lógica de autenticação?")
- Retorna respostas focadas com menos de 300 palavras
- Seguro para executar em paralelo
- Utiliza o modelo Haiku

**Ferramentas disponíveis:** grep, glob, view

**Quando usar:**
- Para encontrar arquivos rapidamente
- Para buscar palavras-chave no código
- Para entender como o código funciona
- Para localizar lógica específica no repositório

### 2. Agente de Tarefas (task)
**Especialidade:** Execução de comandos com saída verbosa

**Características:**
- Executa comandos como testes, builds, lints e instalação de dependências
- Retorna resumo breve em caso de sucesso (ex: "Todos os 247 testes passaram", "Build bem-sucedido")
- Retorna saída completa em caso de falha (stack traces, erros do compilador)
- Mantém o contexto principal limpo minimizando a saída de comandos bem-sucedidos
- Utiliza o modelo Haiku

**Ferramentas disponíveis:** Todas as ferramentas CLI

**Quando usar:**
- Para executar testes
- Para fazer build do projeto
- Para executar linters
- Para instalar dependências
- Quando você só precisa saber se um comando foi bem-sucedido ou falhou

### 3. Agente de Propósito Geral (general-purpose)
**Especialidade:** Tarefas complexas de múltiplas etapas

**Características:**
- Agente com capacidade completa executando em um subprocesso
- Usa o conjunto completo de ferramentas
- Raciocínio de alta qualidade
- Executa em uma janela de contexto separada para manter a conversa principal limpa
- Utiliza o modelo Sonnet

**Ferramentas disponíveis:** Todas as ferramentas CLI

**Quando usar:**
- Para tarefas complexas de múltiplas etapas
- Quando é necessário o conjunto completo de ferramentas
- Para tarefas que requerem raciocínio sofisticado

## Notas Importantes

### Execução de Agentes
- Os agentes de tarefas executam sequencialmente (um de cada vez)
- Cada agente não tem estado - é necessário fornecer contexto completo no prompt
- Os resultados dos agentes são retornados em uma única mensagem
- É possível usar o parâmetro 'model' para substituir o modelo padrão de qualquer tipo de agente

### Quando NÃO usar a ferramenta Task
- Para ler caminhos de arquivo específicos que você já conhece - use a ferramenta view
- Para uma busca simples com grep/glob - use as ferramentas grep/glob diretamente
- Para comandos onde você precisa da saída completa imediata no seu contexto - use bash diretamente
- Para operações de arquivo em arquivos conhecidos - use as ferramentas edit/create diretamente

### Uso Proativo
- Use o agente "explore" proativamente para entender o código antes de fazer alterações
- Os agentes especializados são confiáveis e de alta qualidade para seus domínios específicos

## Exemplo de Uso

Para entender a estrutura de um projeto:
```
Agente: explore
Prompt: "Quais são os arquivos principais deste projeto e qual é a estrutura de diretórios?"
```

Para executar testes:
```
Agente: task
Prompt: "Execute os testes do projeto"
```

Para uma tarefa complexa:
```
Agente: general-purpose
Prompt: "Refatore o módulo de autenticação para usar JWT em vez de sessões"
```
