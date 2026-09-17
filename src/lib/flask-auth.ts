export const FLASK_API = "https://meusite-flask-api.onrender.com";
export const FLASK_LOGIN_URL = `${FLASK_API}/login`;

const TOKEN_KEY = "j90_token";
const USER_KEY = "j90_usuario";

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(USER_KEY);
}

export function storeSession(token: string, usuario?: string | null) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_KEY, token);
  if (usuario) window.localStorage.setItem(USER_KEY, usuario);
}

export function clearSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
}

export type ValidationResult = { valid: boolean; usuario?: string | null };

export async function validateToken(token: string): Promise<ValidationResult> {
  try {
    const res = await fetch(`${FLASK_API}/api/validar-token`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return { valid: false };
    const data = (await res.json()) as { valido?: boolean; usuario?: string };
    return { valid: data.valido === true, usuario: data.usuario ?? null };
  } catch {
    return { valid: false };
  }
}

export type MercadoPlayer = {
  id: string;
  name: string;
  position: string;
  rating: number;
  club?: string;
  league?: string;
  nation?: string;
  card_image_url?: string;
  card_image_large_url?: string;
  image?: string;
  image_large?: string;
  url?: string;
};

export async function searchMercado(params: {
  nome?: string;
  posicao?: string;
  pagina?: number;
}): Promise<{ total: number; players: MercadoPlayer[] }> {
  const token = getStoredToken();
  const qs = new URLSearchParams({
    nome: params.nome ?? "",
    posicao: params.posicao ?? "",
    pagina: String(params.pagina ?? 1),
    por_pagina: "30",
  });
  const res = await fetch(`${FLASK_API}/api/mercado?${qs.toString()}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  if (!res.ok) throw new Error("Não foi possível consultar o mercado agora.");
  const data = (await res.json()) as { total?: number; players?: MercadoPlayer[] };
  return { total: data.total ?? 0, players: data.players ?? [] };
}
