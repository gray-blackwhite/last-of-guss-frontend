export type VoidResponse = {
  ok: boolean;
};

export const makeVoidResponse = (ok: boolean = true): VoidResponse => ({ ok });
