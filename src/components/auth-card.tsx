"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function AuthCard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialKind = searchParams.get("signup") ? "signup" : "login";
  const [kind, setKind] = useState<"login" | "signup">(initialKind);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const isLogin = kind === "login";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Auth backend not wired yet — go home for now.
    router.push("/");
  };

  return (
    <section
      style={{
        background: "var(--pk-cream)",
        minHeight: "calc(100vh - 104px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "min(768px, 100%)",
          background: "var(--pk-cream-soft)",
          borderRadius: 56,
          padding: "65px clamp(32px, 8vw, 117px) 56px",
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontFamily: "var(--pk-font-ui)",
            fontWeight: 800,
            fontSize: "clamp(40px, 7vw, 64px)",
            color: "var(--pk-ink)",
            textAlign: isLogin ? "center" : "left",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
          }}
        >
          {isLogin ? "Log In Account" : "Create Account"}
        </h1>

        <Field
          placeholder="Email"
          value={email}
          onChange={setEmail}
          type="email"
          autoComplete="email"
          required
        />
        {!isLogin && (
          <Field
            placeholder="username"
            value={username}
            onChange={setUsername}
            autoComplete="username"
            required
          />
        )}
        <Field
          placeholder="password"
          value={password}
          onChange={setPassword}
          type={show ? "text" : "password"}
          autoComplete={isLogin ? "current-password" : "new-password"}
          required
          trailing={
            <button
              type="button"
              onClick={() => setShow(!show)}
              aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
              style={{
                background: "transparent",
                border: 0,
                cursor: "pointer",
                width: 32,
                height: 32,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: show ? 1 : 0.6,
                padding: 0,
              }}
            >
              <Image
                src="/profku/icons/eye.png"
                alt=""
                width={24}
                height={28}
              />
            </button>
          }
        />

        <div
          style={{
            height: 1,
            background: "var(--pk-ink)",
            opacity: 0.4,
          }}
        />

        <button
          type="submit"
          style={{
            background: "var(--pk-ink)",
            color: "var(--pk-cream-soft)",
            border: "1px solid var(--pk-ink)",
            borderRadius: 24,
            height: 91,
            fontFamily: "var(--pk-font-ui)",
            fontWeight: 700,
            fontSize: 36,
            cursor: "pointer",
            letterSpacing: "0.02em",
          }}
        >
          {isLogin ? "LOGIN" : "CREATE ACCOUNT"}
        </button>

        <button
          type="button"
          style={{
            background: "var(--pk-paper)",
            border: "1px solid var(--pk-ink)",
            borderRadius: 24,
            height: 91,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
          }}
        >
          <Image
            src="/profku/img/google-button.png"
            alt="Sign in with Google"
            width={363}
            height={59}
            style={{ objectFit: "contain", maxWidth: "100%", height: "auto" }}
          />
        </button>

        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <span
            style={{
              fontFamily: "var(--pk-font-ui)",
              fontSize: 18,
              color: "var(--pk-fg-2)",
            }}
          >
            {isLogin
              ? "Don't have any account?"
              : "Already have an account?"}
          </span>
          <button
            type="button"
            onClick={() => setKind(isLogin ? "signup" : "login")}
            style={{
              fontFamily: "var(--pk-font-ui)",
              fontWeight: 700,
              fontSize: 20,
              color: "var(--pk-primary)",
              background: "transparent",
              border: 0,
              cursor: "pointer",
              padding: 0,
            }}
          >
            {isLogin ? "Create Account" : "Log In"}
          </button>
        </div>

        <p
          style={{
            margin: 0,
            textAlign: "center",
            fontFamily: "var(--pk-font-ui)",
            fontSize: 13,
            color: "var(--pk-fg-3)",
          }}
        >
          Fitur autentikasi belum tersedia. Kamu sudah bisa{" "}
          <Link href="/cari" className="pk-link">
            cari dosen
          </Link>{" "}
          atau{" "}
          <Link href="/tambah-dosen" className="pk-link">
            tulis review
          </Link>{" "}
          tanpa akun.
        </p>
      </form>
    </section>
  );
}

function Field({
  placeholder,
  value,
  onChange,
  type = "text",
  trailing,
  autoComplete,
  required,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  trailing?: React.ReactNode;
  autoComplete?: string;
  required?: boolean;
}) {
  const [focus, setFocus] = useState(false);
  return (
    <div
      style={{
        position: "relative",
        height: 76,
        borderRadius: 24,
        background: "var(--pk-paper)",
        border: focus
          ? "1px solid var(--pk-primary)"
          : "1px solid var(--pk-ink)",
        boxShadow: focus ? "var(--pk-shadow-focus)" : "none",
        display: "flex",
        alignItems: "center",
        padding: "0 29px",
        gap: 10,
        transition: "all 180ms var(--pk-ease)",
      }}
    >
      <input
        type={type}
        autoComplete={autoComplete}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        placeholder={placeholder}
        style={{
          flex: 1,
          border: 0,
          outline: 0,
          background: "transparent",
          fontFamily: "var(--pk-font-ui)",
          fontWeight: 700,
          fontSize: 24,
          color: "var(--pk-ink)",
          minWidth: 0,
        }}
      />
      {trailing}
    </div>
  );
}
