export type SessionUser = { id: string; name: string };

export type SessionState = {
  user: SessionUser | null;
};
