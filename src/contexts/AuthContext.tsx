import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export type UserProfile = {
  id: number;
  email: string;
  name: string;
  phone: string | null;
  role: "admin" | "member";
  planType: "free" | "premium";
  avatarUrl: string | null;
  createdAt: string;
  subscription: {
    planType: string;
    startDate: string;
    expiryDate: string | null;
    status: string;
  } | null;
};

type AuthState = {
  user: UserProfile | null;
  accessToken: string | null;
  isLoading: boolean;
};

type AuthContextValue = AuthState & {
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, phone?: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  isAdmin: boolean;
  isPremium: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = "wtyf_user";

// ── Seeded accounts (no backend required) ──────────────────────────────────
const SEED_ACCOUNTS: Array<UserProfile & { password: string }> = [
  {
    id: 1,
    email: "admin@worldtechfoundation.org",
    password: "wtyf2026",
    name: "Admin User",
    phone: "+256700000000",
    role: "admin",
    planType: "premium",
    avatarUrl: null,
    createdAt: new Date().toISOString(),
    subscription: {
      planType: "premium",
      startDate: new Date().toISOString(),
      expiryDate: null,
      status: "active",
    },
  },
];

function findAccount(email: string, password: string) {
  return SEED_ACCOUNTS.find(
    (a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password
  );
}

function profileFromAccount(a: (typeof SEED_ACCOUNTS)[0]): UserProfile {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _p, ...profile } = a;
  return profile;
}

// ── Provider ───────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    accessToken: null,
    isLoading: true,
  });

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const user: UserProfile = JSON.parse(raw);
        setState({ user, accessToken: "local", isLoading: false });
        return;
      }
    } catch { /* ignore */ }
    setState((s) => ({ ...s, isLoading: false }));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const account = findAccount(email, password);
    if (!account) throw new Error("Invalid email or password.");
    const user = profileFromAccount(account);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    setState({ user, accessToken: "local", isLoading: false });
  }, []);

  const signup = useCallback(async (name: string, email: string, _password: string, phone?: string) => {
    // Create a new member profile stored locally
    const user: UserProfile = {
      id: Date.now(),
      email,
      name,
      phone: phone ?? null,
      role: "member",
      planType: "free",
      avatarUrl: null,
      createdAt: new Date().toISOString(),
      subscription: null,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    setState({ user, accessToken: "local", isLoading: false });
  }, []);

  const logout = useCallback(async () => {
    localStorage.removeItem(STORAGE_KEY);
    setState({ user: null, accessToken: null, isLoading: false });
  }, []);

  const refreshUser = useCallback(async () => {
    // No-op for local auth
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        signup,
        logout,
        refreshUser,
        isAdmin: state.user?.role === "admin",
        isPremium:
          state.user?.planType === "premium" || state.user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
