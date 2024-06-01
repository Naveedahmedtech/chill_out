import crypto from 'crypto';

const tokens = new Map<string, string>(); // In-memory store for tokens

export function generateCsrfToken() {
  return crypto.randomBytes(16).toString('hex');
}

export function storeCsrfToken(token: string) {
  tokens.set(token, token); // Store token in-memory (for demonstration)
  setTimeout(() => tokens.delete(token), 3600000); // Token expires in 1 hour
}

export function isValidCsrfToken(token: string) {
  console.log('TOKEN', token, tokens);
  return tokens.has(token);
}
