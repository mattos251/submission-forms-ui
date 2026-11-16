# DSpace Converter UI

Interface web para enviar um `input-forms.xml` do DSpace 5 e baixar o resultado convertido para o DSpace 9.

## Requisitos

- Node.js 18+ (apenas para rodar os testes)
- API de conversão rodando em `http://localhost:3000` (endpoint `POST /api/v1/conversions`)

## Como executar

Os módulos JavaScript são carregados como ES modules, que os navegadores não aceitam via `file://`. Sirva a pasta por HTTP, por exemplo:

```bash
npx serve .
# ou
python -m http.server 8080
```

Depois abra `http://localhost:8080` (ou a porta exibida).

## Testes

```bash
npm test
```

## Estrutura

```
index.html                  Marcação da página
src/
  styles/main.css           Estilos (cores e transições como variáveis CSS)
  js/
    app.js                  Ponto de entrada: conecta os elementos da página aos módulos
    config.js               URL da API, nome do arquivo baixado e mensagens da interface
    api/
      conversionClient.js   Chamada HTTP à API e tratamento de erros (ConversionError)
    ui/
      fileField.js          Seleção de arquivo por clique ou arraste, com nome e tamanho
      resultPanel.js        Estados de carregamento, sucesso e erro, e link de download
    utils/
      format.js             Formatação de tamanho de arquivo
tests/                      Testes unitários (node:test)
```

## Princípios

- **Separação de responsabilidades:** a comunicação com a API não conhece o DOM; os componentes de UI não conhecem a API.
- **Injeção de dependências:** `createFileField` e `createResultPanel` recebem os elementos como parâmetros, e `convertInputForms` aceita a função `fetch` como parâmetro, o que permite testá-los sem navegador nem servidor.
- **Configuração centralizada:** URL, nome do arquivo e textos ficam em `src/js/config.js`.
- **Sem dependências de runtime:** o projeto usa apenas HTML, CSS e JavaScript nativos.
