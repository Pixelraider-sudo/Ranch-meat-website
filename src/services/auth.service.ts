import type { AuthRecord, AuthSession, AuthUser, LoginPayload, RegisterPayload } from "@/types";

const USERS_KEY = "ranch-meat-users";
const SESSION_KEY = "ranch-meat-session";

const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

function getUsers(): AuthRecord[] {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveUsers(users: AuthRecord[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function saveSession(session: AuthSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getSession(): AuthSession | null {
  if (typeof window === "undefined") return null;

  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) ?? "null");
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function register(payload: RegisterPayload): Promise<AuthUser> {
  await delay();

  const users = getUsers();

  const email = payload.email.trim().toLowerCase();

  if (users.some((user) => user.email.toLowerCase() === email)) {
    throw new Error("An account with this email already exists.");
  }

  const passwordHash = await hashPassword(payload.password);

  const user: AuthRecord = {
    id: crypto.randomUUID(),
    name: payload.name.trim(),
    email,
    role: payload.role,
    createdAt: new Date().toISOString(),
    passwordHash,
  };

  saveUsers([...users, user]);

  const authUser: AuthUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };

  saveSession({
    user: authUser,
    loggedInAt: new Date().toISOString(),
  });

  return authUser;
}

export async function login(payload: LoginPayload): Promise<AuthUser> {
  await delay();

  const users = getUsers();

  const email = payload.email.trim().toLowerCase();

  const user = users.find((u) => u.email.toLowerCase() === email);

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const passwordHash = await hashPassword(payload.password);

  if (user.passwordHash !== passwordHash) {
    throw new Error("Invalid email or password.");
  }

  const authUser: AuthUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };

  saveSession({
    user: authUser,
    loggedInAt: new Date().toISOString(),
  });

  return authUser;
}

export async function logout() {
  await delay(80);
  clearSession();
}
