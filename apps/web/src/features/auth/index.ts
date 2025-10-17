export type AuthSession = {
  userId: string;
  token: string;
};

export const createEmptySession = (): AuthSession => ({
  userId: "",
  token: "",
});
