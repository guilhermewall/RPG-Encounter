export interface ICharacterRequest {
  name: string;
  race: string;
  class: string;
  background: string;
  level?: number;
}

export interface ICharacterResponse {
  id: string;
  name: string;
  race: string;
  class: string;
  background: string;
  level: number;
  createdAt: string;
  isActive: boolean;
}
