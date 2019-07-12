export interface Game {
  gameId: number;
  name: string;
  description: string;
  developerId: number;
  publisherId?: number;
  developer?: Developer;
  publisher?: Publisher;
  gameXrefGenre?: GameXrefGenre[];
}

export interface Developer {
  developerId: number;
  name: string;
  game?: Game[];
}

export interface Publisher {
  publisherId: number;
  name: string;
  game?: Game[];
}

export interface GameXrefGenre {
  gameId: number;
  genreId: number;
  genre?: Genre;
}

export interface Genre {
  genreId: number;
  name: string;
}

export type EntityName = 'game' | 'developer' | 'publisher';

export interface EntityInfo {
  id: number;
  entityName: EntityName;
}

export type HeaderTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';

export interface LinkData {
  id: number;
  path: string;
}
