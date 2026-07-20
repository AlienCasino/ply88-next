export type RootState = Record<string, unknown>;
export type AppDispatch = (action: unknown) => unknown;

export const storePlaceholder = { readyForRtkSetup: true };
