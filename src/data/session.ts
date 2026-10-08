type GameSession = {
  usedWords: Set<string>;
  createdAt: number;
};

const sessions = new Map<string, GameSession>();
const TTL_MS = 30 * 60 * 1000; // 30 minutos em milissegundos
const MAX_SESSIONS = 10000; // Limite máximo de sessões
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000; // Intervalo de limpeza a cada 5 minutos

function createSession() {
  if (sessions.size >= MAX_SESSIONS) {
    throw new Error(
      "Limite máximo de sessões atingido. Por favor, tente novamente mais tarde.",
    );
  }
  const sessionId = crypto.randomUUID();
  sessions.set(sessionId, {
    usedWords: new Set<string>(),
    createdAt: Date.now(),
  });
  return sessionId;
}

function getSession(sessionId: string) {
  const session = sessions.get(sessionId);
  if (session && Date.now() - session.createdAt > TTL_MS) {
    sessions.delete(sessionId);
    return undefined;
  }
  return sessions.get(sessionId);
}

setInterval(() => {
  for (const [sessionId, session] of sessions.entries()) {
    if (Date.now() - session.createdAt > TTL_MS) {
      sessions.delete(sessionId);
    }
  }
}, CLEANUP_INTERVAL_MS).unref();

export { createSession, getSession };
