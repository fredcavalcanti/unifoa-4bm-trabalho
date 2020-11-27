import React, { InputHTMLAttributes, ButtonHTMLAttributes } from "react";

// Should we rename this file to index.d.ts?

export interface DivProps extends React.HTMLAttributes<HTMLDivElement> {
  compact?: boolean | string | undefined;
  width?: number | string | undefined;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export interface UserProps {
  name: string;
  email: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  c_password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthContextProps {
  signed: boolean;
  loading: boolean;
  user: UserProps | string;
  setLoading: (loading: boolean) => void;
  signIn: (credentials: LoginCredentials) => Promise<void>;
  signOut: () => {};
  register: (credentials: RegisterCredentials) => Promise<void>;
}
