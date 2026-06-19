# Extração de documentos

API feita em Node.js e TypeScript para buscar documentos PDF em uma página, extrair o conteúdo, baixar os arquivos e gerar um único PDF com todos eles.

## Tecnologias

- Node.js
- TypeScript
- Express
- Puppeteer
- pdf-parse
- pdf-lib

## Arquitetura

O projeto utiliza uma arquitetura inspirada no padrão **MVC (Model-View-Controller)**, adaptada para uma API REST. Como a aplicação não possui interface gráfica, a camada de *View* é representada pelas respostas JSON enviadas ao cliente.

- **Models:** definem, por meio de interfaces TypeScript, os formatos dos dados processados pela aplicação.
- **Controllers:** recebem as requisições HTTP, acionam os serviços e retornam as respostas ou os erros adequados.
- **Services:** concentram as regras de negócio e as operações de scraping, download e união dos PDFs.
- **Routes:** definem os endpoints e os associam aos respectivos controllers.
- **Shared:** reúne recursos reutilizáveis entre os módulos, como modelos e exceções personalizadas.

Os módulos são separados por responsabilidade (`crawling`, `scraping`, `download` e `merge`). O `CrawlingService` coordena o fluxo principal, chamando cada serviço na ordem necessária e mantendo as responsabilidades desacopladas.

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
