import { createContext, useState, useEffect, useContext, type ReactNode } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export interface User {
  email: string;
  name: string;
  avatar: string;
  dateOfBirth?: string;
  gender: string;
}

export interface ChildSignUpData {
  avatar: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
}

export interface SignUpData {
  role: "parent_or_mentor" | "pastor_or_leader";
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  child: ChildSignUpData;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isChild: boolean;
  error: string | null;
  login: (data: LoginData) => Promise<void>;
  signup: (data: SignUpData) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

async function authFetch(endpoint: string, options: { method?: string; body?: object } = {}) {
  const { method = "POST", body } = options;

  try {
    const fetchParam: RequestInit = {
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };

    if(body && method !== "GET" && method !== "HEAD") {
      fetchParam.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_URL}${endpoint}`, fetchParam);

    const data = await response.json();

    if(!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (err) {
    if (err instanceof TypeError && err.message === "Failed to fetch") {
      throw new Error("Cannot connect to server. Please try again later");
    }
    throw err;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChild, setIsChild] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Confirm the user is logged in before anything
  useEffect(() => {
    async function checkSession() {
      try {
        const data = await authFetch("/auth/session", { method: "GET" });
        setUser(data.user);
        setIsAuthenticated(true);
        setIsChild(data.user.role === "child");
      } catch (err) {
        setUser(null);
        setIsAuthenticated(false);
        setIsChild(false);
      } finally {
        setIsLoading(false);
      }
    }
    checkSession();
  }, []);

  const login = async (data: LoginData) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authFetch("/auth/login", { body: { email: data.email, password: data.password } });
      setUser(res.user);
      setIsAuthenticated(true);
      setIsChild(res.user.role === "child");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignUpData) => {
    setIsLoading(true);
    setError(null);
    try {
      await authFetch("/auth/signup", { body: data });
    } catch (err) {
      if(!error) {
        setError(err instanceof Error ? err.message : "Failed to create account");
      }
    } finally {
      setIsLoading(false);
    }
  }
  
  const logout = async () => {
    try {
      await authFetch("/auth/logout", { method: "POST" });
    } catch {} finally {
      setUser(null);
      setIsAuthenticated(false);
      setIsChild(false);
    }
  }

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, isChild, error, login, signup, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if(!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}