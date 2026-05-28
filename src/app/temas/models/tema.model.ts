export interface Tema {
  id: number;
  nombre_tema: string;
}

export interface CreateTemaDto {
  tema: string;
}

export interface UpdateTemaDto {
  tema: string;
}
