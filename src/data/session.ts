type GameSession = {
  usedWords: Set<string>;
  createdAt: number;
};

const sessions = new Map<string, GameSession>();

function createSession() {
  const sessionId = crypto.randomUUID();
  sessions.set(sessionId, {
    usedWords: new Set<string>(),
    createdAt: Date.now(),
  });
  return sessionId;
}

function getSession(sessionId: string) {
  return sessions.get(sessionId);
}

export { createSession, getSession };
