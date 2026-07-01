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

const BASE = import.meta.env.BASE_URL?.replace(/\/$/, "") || "";
const STORAGE_ACCESS = "wtyf_access";
const STORAGE_REFRESH = "wtyf_refresh";

async function apiPost(path: string, body: object, token?: string | null) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error((data as { error?: string }).error ?? "Request failed");
  return data;
}

async function apiGet(path: string, token: string) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error((data as { error?: string }).error ?? "Request failed");
  return data;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    accessToken: localStorage.getItem(STORAGE_ACCESS),
    isLoading: true,
  });

  const fetchMe = useCallback(async (token: string): Promise<UserProfile | null> => {
    try {
      return await apiGet("/api/auth/me", token) as UserProfile;
    } catch {
      return null;
    }
  }, []);

  const tryRefresh = useCallback(async (): Promise<string | null> => {
    const refreshToken = localStorage.getItem(STORAGE_REFRESH);
    if (!refreshToken) return null;
    try {
      const data = await apiPost("/api/auth/refresh", { refreshToken }) as { accessToken: string; refreshToken: string };
      localStorage.setItem(STORAGE_ACCESS, data.accessToken);
      localStorage.setItem(STORAGE_REFRESH, data.refreshToken);
      return data.accessToken;
    } catch {
      localStorage.removeItem(STORAGE_ACCESS);
      localStorage.removeItem(STORAGE_REFRESH);
      return null;
    }
  }, []);

  // Bootstrap auth on mount
  useEffect(() => {
    let cancelled = false;
    async function init() {
      let token = localStorage.getItem(STORAGE_ACCESS);
      if (!token) {
        setState((s) => ({ ...s, isLoading: false }));
        return;
      }
      let user = await fetchMe(token);
      if (!user) {
        token = await tryRefresh();
        user = token ? await fetchMe(token) : null;
      }
      if (!cancelled) {
        setState({ user, accessToken: token, isLoading: false });
      }
    }
    init();
    return () => { cancelled = true; };
  }, [fetchMe, tryRefresh]);

  const login = useCallback(async (email: string, password: string) => {
    const data = await apiPost("/api/auth/login", { email, password }) as {
      accessToken: string; refreshToken: string; user: UserProfile;
    };
    localStorage.setItem(STORAGE_ACCESS, data.accessToken);
    localStorage.setItem(STORAGE_REFRESH, data.refreshToken);
    setState({ user: data.user, accessToken: data.accessToken, isLoading: false });
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string, phone?: string) => {
    const data = await apiPost("/api/auth/signup", { name, email, password, phone }) as {
      accessToken: string; refreshToken: string; user: UserProfile;
    };
    localStorage.setItem(STORAGE_ACCESS, data.accessToken);
    localStorage.setItem(STORAGE_REFRESH, data.refreshToken);
    setState({ user: data.user, accessToken: data.accessToken, isLoading: false });
  }, []);

  const logout = useCallback(async () => {
    const refreshToken = localStorage.getItem(STORAGE_REFRESH);
    if (refreshToken) {
      apiPost("/api/auth/logout", { refreshToken }, state.accessToken).catch(() => {});
    }
    localStorage.removeItem(STORAGE_ACCESS);
    localStorage.removeItem(STORAGE_REFRESH);
    setState({ user: null, accessToken: null, isLoading: false });
  }, [state.accessToken]);

  const refreshUser = useCallback(async () => {
    if (!state.accessToken) return;
    const user = await fetchMe(state.accessToken);
    if (user) setState((s) => ({ ...s, user }));
  }, [state.accessToken, fetchMe]);

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      signup,
      logout,
      refreshUser,
      isAdmin: state.user?.role === "admin",
      isPremium: state.user?.planType === "premium" || state.user?.role === "admin",
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
