export type Provider = "GitHub";

export interface Repository {
  id: number;
  provider: Provider;
  owner: string;
  name: string;
  enabled: boolean;
}