"use client";

import { FormEvent, ReactNode, useEffect, useState } from "react";
import { LogOut, LoaderCircle, ShieldCheck, Mail, KeyRound } from "lucide-react";
import { useProductStore } from "@/store/productStore";
import { getBrowserSupabaseClient } from "@/lib/supabase/browser";

interface AdminGateProps {
  children: ReactNode;
}

export default function AdminGate({ children }: AdminGateProps) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = getBrowserSupabaseClient();

    supabase.auth.getSession().then(({ data }) => {
      setIsAuthenticated(Boolean(data.session));
      setLoading(false);

      if (data.session) {
        void useProductStore.getState().loadProducts(true);
      }
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(Boolean(session));
      setLoading(false);

      if (session) {
        void useProductStore.getState().loadProducts(true);
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const supabase = getBrowserSupabaseClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        throw signInError;
      }

      await useProductStore.getState().loadProducts(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Falha ao entrar no painel.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    const supabase = getBrowserSupabaseClient();
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background px-4 py-20 text-foreground">
        <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center">
          <div className="text-center">
            <LoaderCircle className="mx-auto h-10 w-10 animate-spin text-copper" />
            <p className="mt-4 text-sm uppercase tracking-[0.3em] text-muted">Carregando acesso</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(48,20,31,0.12),transparent_40%),linear-gradient(180deg,var(--background)_0%,var(--surface)_100%)] px-4 py-20 text-foreground">
        <div className="mx-auto grid min-h-[85vh] max-w-6xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative overflow-hidden rounded-[2rem] border border-[#eadfd4] bg-[#1f1417] p-8 text-white shadow-[0_28px_70px_rgba(48,20,31,0.2)] sm:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(48,20,31,0.22),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.12),transparent_24%)]" />
            <div className="relative">
              <ShieldCheck className="h-12 w-12 text-[#f3dcc5]" />
              <p className="mt-6 text-[11px] uppercase tracking-[0.45em] text-[#f3dcc5]">Painel administrativo</p>
              <h1 className="mt-4 font-serif text-4xl leading-[1.02] md:text-5xl">Acesso ao CMS do showroom</h1>
              <p className="mt-5 max-w-md text-sm leading-7 text-white/78">
                Entre com sua conta do Supabase para gerenciar os produtos.
              </p>
              <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-white/80">
                Está pagina esta acessivel apenas para usuarios autorizados.
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-surface p-8 shadow-[0_24px_70px_rgba(48,20,31,0.08)] sm:p-10">
            <div className="mb-8">
              <p className="text-[11px] uppercase tracking-[0.45em] text-copper">Login</p>
              <h2 className="mt-3 font-serif text-3xl text-foreground">Entrar no painel</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.3em] text-muted">E-mail</span>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-2xl border border-border bg-surface-2 py-4 pl-12 pr-4 text-foreground outline-none transition-colors focus:border-copper"
                    placeholder="admin@lavie.com"
                    required
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Senha</span>
                <div className="relative">
                  <KeyRound className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-2xl border border-border bg-surface-2 py-4 pl-12 pr-4 text-foreground outline-none transition-colors focus:border-copper"
                    placeholder="Senha"
                    required
                  />
                </div>
              </label>

              {error && (
                <p className="rounded-2xl border border-border bg-surface-2 px-4 py-3 text-sm text-muted">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-copper px-6 text-xs font-semibold uppercase tracking-[0.28em] text-white transition-colors hover:bg-[#42202e] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Entrando..." : "Acessar painel"}
              </button>
            </form>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-muted">La Vie CMS</p>
            <h1 className="font-serif text-2xl text-foreground">Painel do showroom</h1>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-foreground transition-colors hover:bg-black/5 dark:hover:bg-white/5"
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>
      </header>

      {children}
    </div>
  );
}
