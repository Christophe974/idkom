'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.idkom.fr';

export interface PartnerData {
  id: number;
  name: string;
  agency: string | null;
  email: string;
  phone: string | null;
  logo: string | null;
  color_primary: string;
  color_secondary: string;
  welcome_text: string | null;
  created_at: string;
}

interface PartnerAuthContextType {
  partner: PartnerData | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshPartner: () => Promise<void>;
}

const PartnerAuthContext = createContext<PartnerAuthContextType | null>(null);

export function usePartnerAuth() {
  const ctx = useContext(PartnerAuthContext);
  if (!ctx) throw new Error('usePartnerAuth must be used within PartnerAuthProvider');
  return ctx;
}

// Public routes that don't require authentication
const PUBLIC_ROUTES = ['/partenaire/connexion', '/partenaire/activer', '/partenaire/reset'];

export default function PartnerAuthProvider({ children }: { children: ReactNode }) {
  const [partner, setPartner] = useState<PartnerData | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const isPublicRoute = PUBLIC_ROUTES.some((r) => pathname.startsWith(r));

  const fetchPartner = useCallback(async (jwt: string): Promise<PartnerData | null> => {
    try {
      const res = await fetch(`${API_URL}/partner-portal.php?action=settings`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      const json = await res.json();
      if (json.success) return json.data as PartnerData;
      return null;
    } catch {
      return null;
    }
  }, []);

  // On mount: validate stored token
  useEffect(() => {
    async function init() {
      const stored = localStorage.getItem('partner_token');
      if (!stored) {
        setLoading(false);
        if (!isPublicRoute) router.replace('/partenaire/connexion');
        return;
      }

      const data = await fetchPartner(stored);
      if (data) {
        setToken(stored);
        setPartner(data);
      } else {
        localStorage.removeItem('partner_token');
        if (!isPublicRoute) router.replace('/partenaire/connexion');
      }
      setLoading(false);
    }

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await fetch(`${API_URL}/partner-auth.php?action=login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Identifiants incorrects');

      const jwt = json.data.token as string;
      localStorage.setItem('partner_token', jwt);
      setToken(jwt);

      const data = await fetchPartner(jwt);
      if (data) setPartner(data);

      router.replace('/partenaire');
    },
    [fetchPartner, router],
  );

  const logout = useCallback(() => {
    localStorage.removeItem('partner_token');
    setToken(null);
    setPartner(null);
    router.replace('/partenaire/connexion');
  }, [router]);

  const refreshPartner = useCallback(async () => {
    if (!token) return;
    const data = await fetchPartner(token);
    if (data) setPartner(data);
  }, [token, fetchPartner]);

  return (
    <PartnerAuthContext.Provider
      value={{ partner, token, loading, isAuthenticated: !!partner && !!token, login, logout, refreshPartner }}
    >
      {children}
    </PartnerAuthContext.Provider>
  );
}
