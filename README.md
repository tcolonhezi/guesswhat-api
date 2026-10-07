# GuessWhat API

API para um jogo de adivinhação. Ela cria sessões de jogo, disponibiliza temas e gera palavras secretas com dicas usando a API do Google Gemini.

## Tecnologias

- Node.js
- TypeScript
- Express
- Google Gemini

## Requisitos

- Node.js 20 ou superior
- Uma chave de API do Google Gemini

## Instalação

```bash
npm install
```

Crie um arquivo `.env` na raiz do projeto com sua chave:

```env
GEMINI_API_KEY=sua_chave_api
```

## Executar

Modo de desenvolvimento:

```bash
npm run dev
```

Compilar o projeto:

```bash
npm run build
```

Por padrão, o servidor fica disponível em `http://localhost:3333`. Para usar outra porta, defina a variável de ambiente `PORT`.

## Endpoints

### Verificar disponibilidade

`GET /alive`

Retorna o estado do servidor e seu tempo de atividade.

### Listar temas

`GET /themes`

Exemplo de resposta:

```json
{
  "themes": [
    "animais",
    "comidas",
    "lugares",
    "profissões",
    "objetos",
    "esportes",
    "programação"
  ]
}
```

### Criar sessão

`POST /session`

Exemplo de resposta:

```json
{
  "sessionId": "id-da-sessao"
}
```

### Gerar desafio

`POST /challenge`

Envie o identificador da sessão e um dos temas disponíveis:

```json
{
  "sessionId": "id-da-sessao",
  "theme": "animais"
}
```

Exemplo de resposta:

```json
{
  "word": "girafa",
  "tip": "É um mamífero conhecido por seu pescoço muito comprido."
}
```

As palavras já usadas não são repetidas dentro da mesma sessão. As sessões são mantidas em memória e são apagadas quando o servidor é reiniciado.
