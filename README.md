# GuessWhat API

API em TypeScript para um jogo de adivinhação. Ela cria sessões, oferece temas e usa o Google Gemini para gerar uma palavra secreta e uma dica.

## Tecnologias

Node.js, TypeScript, Express, CORS, express-rate-limit e Google Gemini.

## Como executar

Requisitos: Node.js 20 ou superior e uma chave da API do Google Gemini.

```bash
npm install
```

Crie um arquivo `.env` na raiz do projeto:

```env
GEMINI_API_KEY=sua_chave_api
ALLOWED_ORIGINS=http://localhost:3000
# Opcional. O padrão é 3333.
PORT=3333
```

Inicie em modo de desenvolvimento:

```bash
npm run dev
```

Para compilar:

```bash
npm run build
```

## Endpoints

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/alive` | Verifica se a API está ativa. |
| `GET` | `/themes` | Lista os temas disponíveis. |
| `POST` | `/session` | Cria uma sessão e retorna seu `sessionId`. |
| `POST` | `/challenge` | Gera uma palavra e uma dica para a sessão e o tema informados. |

Exemplo de solicitação para `/challenge`:

```json
{
  "sessionId": "id-da-sessao",
  "theme": "animais"
}
```

A resposta contém `word` e `tip`. Os temas disponíveis são animais, comidas, lugares, profissões, objetos, esportes e programação.

CORS permite apenas as origens configuradas em `ALLOWED_ORIGINS` (separe múltiplas origens por vírgula). A API também limita as solicitações por endereço IP: até 5 desafios e 10 novas sessões por minuto.

As sessões são mantidas em memória, expiram após 30 minutos e são removidas quando o servidor reinicia. A API considera palavras já usadas ao gerar novos desafios para a mesma sessão.
