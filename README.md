# Extração de documentos

API feita em Node.js e TypeScript para buscar documentos PDF em uma página, extrair o conteúdo, baixar os arquivos e gerar um único PDF com todos eles.

## Tecnologias

- Node.js
- TypeScript
- Express
- Puppeteer
- pdf-parse
- pdf-lib

## Instalação

```bash
npm install
```

## Executando o projeto

Em desenvolvimento:

```bash
npm run dev
```

A API ficará disponível em `http://localhost:3000`.

## Rota

```http
GET /document/crawling
```

Ao chamar essa rota, o projeto:

1. Busca os PDFs disponíveis na página configurada.
2. Extrai o nome, a URL e o conteúdo de cada PDF.
3. Salva os arquivos na pasta `downloads`.
4. Gera o arquivo `documentos_unificados.pdf` com todos os documentos.

A resposta contém os documentos encontrados e os dados do arquivo unificado.
