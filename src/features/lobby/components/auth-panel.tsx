"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff, LockKeyhole, UserRound, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/design-system/primitives/button";
import { BrandMark } from "@/design-system/components/brand-mark";
import { accountSummary } from "@/data";
import { cn } from "@/shared/lib/utils";

type AuthMode = "login" | "register";

interface AuthPanelProps {
  initialMode?: AuthMode;
  asPage?: boolean;
  onClose?: () => void;
}

interface AuthState {
  account: string;
  password: string;
  confirm: string;
  realName: string;
  accepted: boolean;
}

const initialState: AuthState = {
  account: "",
  password: "",
  confirm: "",
  realName: "",
  accepted: true,
};

export function AuthPanel({ initialMode = "register", asPage = false, onClose }: AuthPanelProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [state, setState] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const errors = useMemo(() => {
    const next: Partial<Record<keyof AuthState, string>> = {};
    if (!state.account.trim()) next.account = "Informe número do celular, e-mail ou conta.";
    if (state.password.length < 6) next.password = "A senha deve ter pelo menos 6 caracteres.";
    if (mode === "register" && state.confirm !== state.password) next.confirm = "As senhas devem ser iguais.";
    if (mode === "register" && state.realName.trim().length < 2) next.realName = "Informe o nome da conta bancária de retirada.";
    if (mode === "register" && !state.accepted) next.accepted = "Aceite o acordo para continuar.";
    return next;
  }, [mode, state]);

  const hasErrors = Object.keys(errors).length > 0;
  const strength = Math.min(4, Math.max(0, Math.floor(state.password.length / 3)));

  function update<K extends keyof AuthState>(key: K, value: AuthState[K]) {
    setStatus(null);
    setState((current) => ({ ...current, [key]: value }));
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    if (hasErrors) return;
    setStatus(mode === "login" ? "Login simulado realizado." : "Registro simulado concluído.");
  }

  const content = (
    <section
      className={cn(
        "min-h-dvh bg-[#1d222c] bg-[image:var(--auth-bg)] bg-contain bg-top bg-repeat-x px-6 pb-10 pt-[calc(env(safe-area-inset-top)+16px)] text-white",
        asPage ? "" : "max-h-[92dvh] overflow-y-auto rounded-t-[10px]",
      )}
      style={{ "--auth-bg": "url('/a66/login-bg.avif')" } as React.CSSProperties}
    >
      <div className="mb-6 flex h-8 items-center justify-between">
        <button
          type="button"
          onClick={onClose}
          className="grid size-8 place-items-center rounded-full text-nav-muted outline-none ring-brand-gold/40 focus-visible:ring-2"
          aria-label={onClose ? "Fechar" : "Voltar"}
        >
          {onClose ? <X className="size-5" /> : <ArrowLeft className="size-5" />}
        </button>
      </div>
      <div className="flex justify-center">
        <BrandMark />
      </div>
      <div className="relative mt-7 aspect-[3.4/1] overflow-hidden bg-[#003a77]">
        <Image src="/a66/invite-banner.avif" alt="Convide uma pessoa e receba bônus de R$ 120" fill priority className="object-cover" />
      </div>

      <form onSubmit={submit} className="mt-3 space-y-3">
        <FieldLabel>Suporte Número do Celular/E-mail/Conta {mode === "register" ? "Registro" : "Login"}</FieldLabel>
        <div className="flex h-[42px] items-center rounded-[6px] border border-[#496592] bg-[#222832] focus-within:border-brand-gold">
          <div className="flex h-full items-center gap-2 border-r border-[#344868] px-3 text-sm text-nav-muted">
            <Image
              src="/a66/brazil.png"
              alt="Brasil"
              width={20}
              height={15}
              style={{ height: "auto", width: 20 }}
            />
            {accountSummary.phonePrefix}
          </div>
          <span className="px-2 text-[#ea4e3d]">*</span>
          <input
            value={state.account}
            onChange={(event) => update("account", event.target.value)}
            placeholder="Número do Celular/E-mail/Conta"
            inputMode="email"
            className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#496592]"
            aria-invalid={submitted && Boolean(errors.account)}
          />
        </div>
        <InlineError show={submitted && Boolean(errors.account)}>{errors.account}</InlineError>

        <div className="grid grid-cols-2 gap-2 text-xs font-bold">
          <button type="button" className="flex items-center gap-1.5 text-brand-gold">
            <LockKeyhole className="size-4" />
            Cadastro de senha
          </button>
          <button type="button" className="flex items-center justify-end gap-1.5 text-white">
            <span className="grid size-4 place-items-center rounded-full border border-[#496592] text-[9px] text-nav-muted">123</span>
            Cadastro com código
          </button>
        </div>

        <PasswordInput
          value={state.password}
          show={showPassword}
          placeholder="Senha"
          onToggle={() => setShowPassword((value) => !value)}
          onChange={(value) => update("password", value)}
        />
        {mode === "register" ? (
          <>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-nav-muted">Força</span>
              {[1, 2, 3, 4].map((step) => (
                <span
                  key={step}
                  className={cn(
                    "h-1.5 flex-1 rounded-full bg-[#344868]",
                    step <= strength && "bg-brand-gold",
                    step === 4 && step <= strength && "bg-[#04be02]",
                  )}
                />
              ))}
            </div>
            <PasswordInput
              value={state.confirm}
              show={showPassword}
              placeholder="Confirme a senha"
              onToggle={() => setShowPassword((value) => !value)}
              onChange={(value) => update("confirm", value)}
            />
            <InputLine
              icon={<UserRound className="size-4" />}
              value={state.realName}
              placeholder="Nome real"
              onChange={(value) => update("realName", value)}
            />
            <p className="text-[11px] text-[#ffaa09]">Deve ter o mesmo nome da sua conta bancária de retirada</p>
          </>
        ) : null}
        <InlineError show={submitted && Boolean(errors.password || errors.confirm || errors.realName)}>
          {errors.password || errors.confirm || errors.realName}
        </InlineError>

        {mode === "register" ? (
          <label className="flex items-start gap-2 text-xs leading-5 text-[#9fb4d5]">
            <input
              type="checkbox"
              checked={state.accepted}
              onChange={(event) => update("accepted", event.target.checked)}
              className="mt-0.5 size-5 accent-[#04be02]"
            />
            <span>
              Tenho mais de 18 anos, li e concordo com{" "}
              <span className="font-bold text-brand-gold">《Acordo de Usuário》</span>
            </span>
          </label>
        ) : null}
        <InlineError show={submitted && Boolean(errors.accepted)}>{errors.accepted}</InlineError>

        <Button className="h-11 w-full rounded-[8px] bg-brand-gold font-bold text-brand-gold-foreground hover:bg-[#f6d26f]">
          {mode === "login" ? "Login" : "Registro"}
        </Button>
        {status ? <p className="text-center text-xs text-[#04be02]">{status}</p> : null}
      </form>

      <div className="mt-4 grid grid-cols-2 text-center text-xs font-bold text-brand-gold">
        <a href="/profile">Suporte ao cliente</a>
        <Link href="/">Demo</Link>
      </div>
      <p className="mt-8 text-center text-sm font-bold">
        {mode === "login" ? "Não tem uma conta?" : "Já tem uma conta?"}
        <button type="button" onClick={() => setMode(mode === "login" ? "register" : "login")} className="ml-1 text-brand-gold">
          {mode === "login" ? "Registro" : "Login"}
        </button>
      </p>
      <div className="mt-6 flex items-center justify-center gap-3 text-xs text-[#496592]">
        <span className="h-px w-11 bg-[#344868]" />
        Registro vinculativo
        <span className="h-px w-11 bg-[#344868]" />
      </div>
      <button type="button" className="mx-auto mt-6 grid size-11 place-items-center rounded-full bg-white shadow">
        <Image src="/a66/google.avif" alt="Continuar com Google" width={28} height={28} />
      </button>
    </section>
  );

  if (asPage) return content;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/55">
      <div className="w-full max-w-[var(--app-max-width)]">{content}</div>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-medium text-white">{children}</p>;
}

function InlineError({ show, children }: { show: boolean; children?: React.ReactNode }) {
  return show && children ? <p className="-mt-1 text-[11px] text-[#ea4e3d]">{children}</p> : null;
}

function InputLine({
  icon,
  value,
  placeholder,
  onChange,
}: {
  icon: React.ReactNode;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex h-[42px] items-center gap-2 rounded-[6px] border border-[#496592] bg-[#222832] px-3 text-nav-muted focus-within:border-brand-gold">
      {icon}
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#496592]" />
    </label>
  );
}

function PasswordInput({
  value,
  show,
  placeholder,
  onToggle,
  onChange,
}: {
  value: string;
  show: boolean;
  placeholder: string;
  onToggle: () => void;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex h-[42px] items-center rounded-[6px] border border-[#496592] bg-[#222832] px-3 text-nav-muted focus-within:border-brand-gold">
      <LockKeyhole className="size-4" />
      <span className="px-2 text-[#ea4e3d]">*</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#496592]"
      />
      <button type="button" onClick={onToggle} className="grid size-8 place-items-center" aria-label={show ? "Ocultar senha" : "Mostrar senha"}>
        {show ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
      </button>
    </div>
  );
}
